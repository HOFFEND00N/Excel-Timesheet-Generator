import { TableData } from "../classes/TableData";
import { CommonValue } from "./types";
import { getTableHeaders } from "../constants/constant";

type MakeEmployeeDataRowsArguments = {
  tableData: TableData;
  headers: CommonValue[];
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

  const tableHeaders = getTableHeaders();
  const dataArr: CommonValue[][] = [];

  for (let i = 0; i < tableData.employees.length; i++) {
    const employeeDataRows: string[] = [];

    for (const header of headers) {
      const tableHeader = tableHeaders.find((item) => item.label == header);
      if (header != "Employee" && tableData[tableHeader.dataKey] != undefined)
        employeeDataRows.push(tableData[tableHeader.dataKey]);
    }
    employeeDataRows.push(tableData.employees[i].name);

    const task = await fetchUserTasks({
      jiraUserName: tableData.employees[i].jiraUsername,
      login,
      password,
    });

    employeeDataRows.push(task.join(" "));
    dataArr.push(employeeDataRows);
  }
  return dataArr;
}
