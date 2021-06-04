import { TableData } from "../classes/TableData";
import { CommonValue, FetchUserTasksArguments, TableHeader } from "./types";

type MakeEmployeeDataRowsArguments = {
  tableData: TableData;
  headers: TableHeader[];
  fetchUserTasks: ({
    jiraUserName,
    login,
    password,
  }: FetchUserTasksArguments) => Promise<string[]>;
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
    const employeeDataRow = await Promise.all(
      headers.map(async (header) => {
        const employee = tableData.employees[i];
        if (header.label == "Employee") return employee.name;
        if (header.label == "Task") {
          console.log(
            `Fetching tasks from Jira for ${employee.name}. Please wait...`
          );
          const userTasks = await fetchUserTasks({
            jiraUserName: employee.jiraUsername,
            login,
            password,
          });
          return userTasks.join(" ");
        }

        const cell: CommonValue = tableData[header.dataKey];
        return cell == undefined ? "" : cell;
      })
    );

    employeeDataRows.push(employeeDataRow);
  }
  return employeeDataRows;
}
