import { makeTeamLeadJiraTasks, makeSortedUserTasksByEmployeeUsername } from "../index";
import { TableData } from "../../classes/TableData";
import { FetchUserTasksArguments, UserTasks } from "../types";

export async function getUserTasks({
  tableData,
  login,
  password,
  fetchUserTasks,
}: {
  tableData: TableData;
  login: string;
  password: string;
  fetchUserTasks: ({ jiraUserName, login, password }: FetchUserTasksArguments) => Promise<UserTasks>;
}): Promise<Record<string, string[]>> {
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

  return makeSortedUserTasksByEmployeeUsername(tasksRows);
}
