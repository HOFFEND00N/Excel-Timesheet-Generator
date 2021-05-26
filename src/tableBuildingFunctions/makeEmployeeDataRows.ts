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
}: MakeEmployeeDataRowsArguments): Promise<CommonValue[][]> {
  const { login, password } = await getCredentials();
  const employeeDataRows: CommonValue[][] = [];

  for (let i = 0; i < tableData.employees.length; i++) {
    const employeeDataRow = headers
      .filter(
        (header) =>
          tableData[header.dataKey] != undefined && header.label != "Employee"
      )
      .map((header) => tableData[header.dataKey]);

    const employee = tableData.employees[i];
    employeeDataRow.push(employee.name);

    console.log(
      `Fetching tasks from Jira for ${employee.name}. Please wait...`
    );
    const userTasks = await fetchUserTasks({
      jiraUserName: employee.jiraUsername,
      login,
      password,
    });

    employeeDataRow.push(userTasks.join(" "));
    employeeDataRows.push(employeeDataRow);
  }
  return employeeDataRows;
}
