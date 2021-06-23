import { TableData } from "../classes/TableData";
import {
  CommonValue,
  EmployeePosition,
  FetchUserTasksArguments,
  HoursByEmployees,
  ParsedJiraResponse,
  TableHeader,
} from "./types";
import { makeTeamLeadJiraTasks } from "./makeTeamLeadJiraTasks";
import { TEAMLEAD_JIRA_USERNAME } from "../constants/constant";

type MakeEmployeeDataRowsArguments = {
  tableData: TableData;
  headers: TableHeader[];
  fetchUserTasks: ({
    jiraUserName,
    login,
    password,
  }: FetchUserTasksArguments) => Promise<ParsedJiraResponse[]>;
  getCredentials: () => Promise<{ login: string; password: string }>;
  nonWorkingHoursByEmployees: HoursByEmployees;
  workingHoursPerMonth: number;
};

export async function makeEmployeeDataRows({
  tableData,
  headers,
  fetchUserTasks,
  getCredentials,
  nonWorkingHoursByEmployees,
  workingHoursPerMonth,
}: MakeEmployeeDataRowsArguments): Promise<CommonValue[][]> {
  const { login, password } = await getCredentials();
  const employeeDataRows: CommonValue[][] = [];
  const tasks = tableData.employees
    .filter((employee) => employee.position != EmployeePosition.TeamLead)
    .map((employee) =>
      fetchUserTasks({ jiraUserName: employee.jiraUsername, login, password })
    );

  console.log(`Fetching tasks from Jira for employees. Please wait...`);
  const tasksRows = await Promise.all(tasks);

  if (
    tableData.employees.find(
      (employee) => employee.jiraUsername == TEAMLEAD_JIRA_USERNAME
    )
  )
    tasksRows.push(makeTeamLeadJiraTasks(tasksRows));

  for (let i = 0; i < tableData.employees.length; i++) {
    const employeeDataRow = headers.map((header) => {
      const employee = tableData.employees[i];
      if (header.label == "Employee") return employee.name;
      if (header.label == "Task")
        return tasksRows[i].map((cell) => cell.taskKey).join(" ");
      if (header.label == "Man-Hours")
        return (
          workingHoursPerMonth -
          (nonWorkingHoursByEmployees[employee.name] ?? 0)
        );
      const cell: CommonValue = tableData[header.dataKey];
      return cell ?? "";
    });

    employeeDataRows.push(employeeDataRow);
  }
  return employeeDataRows;
}
