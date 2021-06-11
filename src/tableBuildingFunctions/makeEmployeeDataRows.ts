import { TableData } from "../classes/TableData";
import {
  CommonValue,
  FetchUserTasksArguments,
  HoursByEmployees,
  TableHeader,
} from "./types";

type MakeEmployeeDataRowsArguments = {
  tableData: TableData;
  headers: TableHeader[];
  fetchUserTasks: ({
    jiraUserName,
    login,
    password,
  }: FetchUserTasksArguments) => Promise<string[]>;
  getCredentials: () => Promise<{ login: string; password: string }>;
  workingHoursByEmployees: HoursByEmployees;
};

export async function makeEmployeeDataRows({
  tableData,
  headers,
  fetchUserTasks,
  getCredentials,
  workingHoursByEmployees,
}: MakeEmployeeDataRowsArguments): Promise<CommonValue[][]> {
  const { login, password } = await getCredentials();
  const employeeDataRows: CommonValue[][] = [];
  const tasks = tableData.employees.map((employee) =>
    fetchUserTasks({ jiraUserName: employee.jiraUsername, login, password })
  );

  console.log(`Fetching tasks from Jira for employees. Please wait...`);
  const tasksRows = await Promise.all(tasks);

  for (let i = 0; i < tableData.employees.length; i++) {
    const employeeDataRow = headers.map((header) => {
      const employee = tableData.employees[i];
      if (header.label == "Employee") return employee.name;
      if (header.label == "Task") return tasksRows[i].join(" ");
      if (header.label == "Man-Hours")
        return workingHoursByEmployees[employee.name];
      const cell: CommonValue = tableData[header.dataKey];
      return cell ?? "";
    });

    employeeDataRows.push(employeeDataRow);
  }
  return employeeDataRows;
}
