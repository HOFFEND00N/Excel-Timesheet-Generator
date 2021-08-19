import { TableData } from "../classes/TableData";
import {
  CommonValue,
  FetchUserTasksArguments,
  HoursByEmployees,
  TableHeader,
  UserTasks,
} from "./types";
import { makeTeamLeadJiraTasks } from "./makeTeamLeadJiraTasks";
import { makeSortedUserTasksByEmployeeUsername } from "./makeSortedUserTasksByEmployeeUsername";
import { makeEmployeeDataRow } from "./makeEmployeeDataRow";
import { Employee } from "../classes/Employee";
import fetch from "node-fetch";

type MakeEmployeeDataRowsArguments = {
  tableData: TableData;
  headers: TableHeader[];
  fetchUserTasks: ({
    jiraUserName,
    login,
    password,
  }: FetchUserTasksArguments) => Promise<UserTasks>;
  getCredentials: () => Promise<{ login: string; password: string }>;
  nonWorkingHoursByEmployeesUsername: HoursByEmployees;
  workingHoursPerMonth: number;
};

export async function makeEmployeeDataRows({
  tableData,
  headers,
  fetchUserTasks,
  getCredentials,
  nonWorkingHoursByEmployeesUsername,
  workingHoursPerMonth,
}: MakeEmployeeDataRowsArguments): Promise<CommonValue[][]> {
  const { login, password } = await getCredentials();

  if (
    !(await checkJiraCredentialsCorrectness({
      login,
      password,
      teamLead: tableData.teamLead,
    }))
  ) {
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
  tasksRows.push(
    makeTeamLeadJiraTasks(tasksRows, tableData.teamLead.jiraUsername)
  );

  const userTasksByEmployeeUsername = makeSortedUserTasksByEmployeeUsername(
    tasksRows
  );

  for (const employee of tableData.employees) {
    employeeDataRows.push(
      makeEmployeeDataRow({
        headers,
        userTasksByEmployeeUsername,
        workingHoursPerMonth,
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
      workingHoursPerMonth,
      nonWorkingHoursByEmployeesUsername,
      tableData,
      employee: tableData.teamLead,
    })
  );

  return employeeDataRows;
}

async function checkJiraCredentialsCorrectness({
  login,
  password,
  teamLead,
}: {
  login: string;
  password: string;
  teamLead: Employee;
}) {
  const authorizationKey = Buffer.from(`${login}:${password}`).toString(
    "base64"
  );

  const fetchResult = await fetch(
    `https://jiraosl.firmglobal.com/rest/api/2/search?jql=status CHANGED BY ${teamLead.jiraUsername}`,
    {
      method: "get",
      headers: {
        Authorization: `Basic ${authorizationKey}`,
      },
    }
  );

  if (fetchResult.status == 403)
    throw new Error(
      "Your account has been locked out, because of too many attempts. Please unlock your account."
    );
  return fetchResult.status != 401;
}
