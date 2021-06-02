import { TableData } from "../classes/TableData";
import { CommonValue, TableHeader } from "./types";

type MakeEmployeeDataRowsArguments = {
  tableData: TableData;
  headers: TableHeader[];
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
    const employeeDataRow = await Promise.all(
      headers.map(async (header) => {
        let cell: string;
        const employee = tableData.employees[i];
        if (header.label == "Employee") cell = tableData.employees[i].name;
        else if (header.label == "Task") {
          console.log(
            `Fetching tasks from Jira for ${employee.name}. Please wait...`
          );
          const userTasks = await fetchUserTasks({
            jiraUserName: employee.jiraUsername,
            login,
            password,
          });
          cell = userTasks.join(" ");
        } else cell = tableData[header.dataKey];
        return cell;
      })
    );

    employeeDataRows.push(
      employeeDataRow.map((cell) => (cell == undefined ? "" : cell))
    );
  }
  return employeeDataRows;
}
