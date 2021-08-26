import { TableData } from "../classes/TableData";
import { CommonValue, FetchUserTasksArguments, HoursByEmployees, TableHeader, UserTasks } from "./types";
import { makeTeamLeadJiraTasks, makeSortedUserTasksByEmployeeUsername } from "./jiraHelpers";

import { makeEmployeeDataRow } from "./makeEmployeeDataRow";

type MakeEmployeeDataRowsArguments = {
  tableData: TableData;
  headers: TableHeader[];
  fetchUserTasks: ({ jiraUserName, login, password }: FetchUserTasksArguments) => Promise<UserTasks>;
  getCredentials: () => Promise<{ login: string; password: string }>;
  nonWorkingHoursByEmployeesUsername: HoursByEmployees;
  areJiraCredentialsCorrect: ({ login, password }: { login: string; password: string }) => Promise<boolean>;
  workingHoursByEmployeesUsername: HoursByEmployees;
};

export async function makeEmployeeDataRows({
  tableData,
  headers,
  fetchUserTasks,
  getCredentials,
  nonWorkingHoursByEmployeesUsername,
  workingHoursByEmployeesUsername,
  areJiraCredentialsCorrect,
}: MakeEmployeeDataRowsArguments): Promise<CommonValue[][]> {
  const { login, password } = await getCredentials();

  const cahAuthorize = await areJiraCredentialsCorrect({
    login,
    password,
  });
  if (!cahAuthorize) {
    throw new Error("Wrong credentials. Please try again");
  }

  const employeeDataRows: CommonValue[][] = [];
  const tasks = tableData.employees.map((employee) =>
    fetchUserTasks({
      jiraUserName: employee.jiraUsername,
      login,
      password,
    })
  );

  console.log(`Fetching tasks from Jira for employees. Please wait...`);
  const tasksRows = await Promise.all(tasks);
  tasksRows.push(makeTeamLeadJiraTasks(tasksRows, tableData.teamLead.jiraUsername));

  const userTasksByEmployeeUsername = makeSortedUserTasksByEmployeeUsername(tasksRows);

  for (const employee of tableData.employees) {
    employeeDataRows.push(
      makeEmployeeDataRow({
        headers,
        userTasksByEmployeeUsername,
        workingHoursPerMonth: workingHoursByEmployeesUsername[employee.jiraUsername],
        nonWorkingHoursByEmployeesUsername,
        tableData,
        employee,
      })
    );
  }

  employeeDataRows.push(
    makeEmployeeDataRow({
      headers,
      userTasksByEmployeeUsername,
      workingHoursPerMonth: workingHoursByEmployeesUsername[tableData.teamLead.jiraUsername],
      nonWorkingHoursByEmployeesUsername,
      tableData,
      employee: tableData.teamLead,
    })
  );

  return employeeDataRows;
}
