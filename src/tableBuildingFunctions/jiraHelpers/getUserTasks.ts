import { makeTeamLeadJiraTasks, makeSortedUserTasksByEmployeeUsername } from "../index";
import { IConfig } from "../../models/IConfig";
import { FetchUserTasksArguments, UserTasks } from "../types";

export async function getUserTasks({
  config,
  login,
  password,
  fetchUserTasks,
}: {
  config: IConfig;
  login: string;
  password: string;
  fetchUserTasks: ({ jiraUserName, login, password }: FetchUserTasksArguments) => Promise<UserTasks>;
}): Promise<Record<string, string[]>> {
  const tasks = config.employees.map((employee) =>
    fetchUserTasks({
      jiraUserName: employee.jiraUsername,
      login,
      password,
    })
  );

  console.log(`Fetching tasks from Jira for employees. Please wait...`);
  const tasksRows = await Promise.all(tasks);
  tasksRows.push(makeTeamLeadJiraTasks(tasksRows, config.teamLead.jiraUsername));

  return makeSortedUserTasksByEmployeeUsername(tasksRows);
}
