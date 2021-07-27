import { TableData } from "../classes/TableData";
import {
  CommonValue,
  FetchUserTasksArguments,
  HoursByEmployees,
  TableHeader,
  UserTasks,
} from "./types";
import { makeTeamLeadJiraTasks } from "./makeTeamLeadJiraTasks";
import { makeUserTasksByEmployeeUsername } from "./makeUserTasksByEmployeeUsername";
import { makeEmployeeDataRow } from "./makeEmployeeDataRow";

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
  const employeeDataRows: CommonValue[][] = [];
  const tasks = tableData.employees.map((employee) =>
    fetchUserTasks({
      jiraUserName: employee.jiraUsername,
      login,
      password,
    })
  );

  try {
    console.log(`Fetching tasks from Jira for employees. Please wait...`);
    const tasksRows = await Promise.all(tasks);
    tasksRows.push(
      makeTeamLeadJiraTasks(tasksRows, tableData.teamLead.jiraUsername)
    );

    const userTasksByEmployeeUsername = makeUserTasksByEmployeeUsername(
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
  } catch (error) {
    console.log(error.message);
    return makeEmployeeDataRows({
      tableData,
      fetchUserTasks,
      getCredentials,
      nonWorkingHoursByEmployeesUsername,
      workingHoursPerMonth,
      headers,
    });
  }
}
