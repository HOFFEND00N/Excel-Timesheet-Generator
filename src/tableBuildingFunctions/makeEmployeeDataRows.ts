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
    const employeeDataRows: string[] = [];

    for (const header of headers) {
      if (header.label != "Employee" && tableData[header.dataKey] != undefined)
        employeeDataRows.push(tableData[header.dataKey]);
    }
    employeeDataRows.push(tableData.employees[i].name);

    const userTasks = await fetchUserTasks({
      jiraUserName: tableData.employees[i].jiraUsername,
      login,
      password,
    });

    employeeDataRows.push(userTasks.join(" "));
    dataArr.push(employeeDataRows);
  }
  return dataArr;
}
