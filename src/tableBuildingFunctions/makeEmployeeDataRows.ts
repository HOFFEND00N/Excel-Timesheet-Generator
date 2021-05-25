import { TableData } from "../classes/TableData";
import { CommonValue, tableHeader } from "./types";

type MakeEmployeeDataRowsArguments = {
  tableData: TableData;
  headers: tableHeader[];
  fetchUserTasks: ({
    jiraUserName,
    login,
    password,
  }: {
    jiraUserName: string;
    login: string;
    password: string;
  }) => Promise<string[]>;
  getCredentials: () => Promise<{ login: string; password: string }>;
};

export async function makeEmployeeDataRows({
  tableData,
  headers,
  fetchUserTasks,
  getCredentials,
}: MakeEmployeeDataRowsArguments) {
  const { login, password } = await getCredentials();
  const dataArr: CommonValue[][] = [];

  for (let i = 0; i < tableData.employees.length; i++) {
    const employeeDataRows = headers
      .filter((header) => tableData[header.dataKey] != undefined)
      .map((header) => {
        if (header.label != "Employee") return tableData[header.dataKey];
      });
    const employee = tableData.employees[i];
    employeeDataRows.push(employee.name);

    console.log(
      `Fetching tasks from Jira for ${employee.name}. Please wait...`
    );
    const userTasks = await fetchUserTasks({
      jiraUserName: employee.jiraUsername,
      login,
      password,
    });

    employeeDataRows.push(userTasks.join(" "));
    dataArr.push(employeeDataRows);
  }
  return dataArr;
}
