import { TableData } from "../classes/TableData";
import {
  CommonValue,
  EmployeePosition,
  FetchUserTasksArguments,
  HoursByEmployees,
  TableHeader,
  UserTasks,
} from "./types";
import { makeTeamLeadJiraTasks } from "./makeTeamLeadJiraTasks";
import { makeUserTasksByEmployeeUsername } from "./makeUserTasksByEmployeeUsername";
import { ensureThatValueIsNotNullAndIsNotUndefined } from "../utilities/ensureThatValueIsNotNullAndIsNotUndefined";

type MakeEmployeeDataRowsArguments = {
  tableData: TableData;
  headers: TableHeader[];
  fetchUserTasks: ({
    jiraUserName,
    login,
    password,
  }: FetchUserTasksArguments) => Promise<UserTasks>;
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
      fetchUserTasks({
        jiraUserName: employee.jiraUsername,
        login,
        password,
      })
    );

  console.log(`Fetching tasks from Jira for employees. Please wait...`);
  const tasksRows = await Promise.all(tasks);
  const teamLead = tableData.employees.find(
    (employee) => employee.position == EmployeePosition.TeamLead
  );

  if (teamLead != undefined) {
    tasksRows.push(makeTeamLeadJiraTasks(tasksRows, teamLead.jiraUsername));
  }

  const userTasksByEmployeeUsername = makeUserTasksByEmployeeUsername(
    tasksRows
  );

  for (let i = 0; i < tasksRows.length; i++) {
    const employeeDataRow = headers.map((header) => {
      const employee = ensureThatValueIsNotNullAndIsNotUndefined(
        tableData.employees.find(
          (employee) => employee.jiraUsername == tasksRows[i].userName
        )
      );
      if (header.label == "Employee") return employee.name;
      if (header.label == "Task")
        return userTasksByEmployeeUsername[employee.jiraUsername];
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
