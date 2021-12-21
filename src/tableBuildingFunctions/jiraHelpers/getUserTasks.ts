import { makeTeamLeadJiraTasks, makeSortedUserTasksByEmployeeUsername } from "../index";
import { FetchUserTasksArguments, UserTasks } from "../types";
import { ITeamConfig } from "../../models/ITeamConfig";

export async function getUserTasks({
  employeeJiraTaskQuery,
  login,
  password,
  fetchUserTasks,
  team,
}: {
  employeeJiraTaskQuery: string;
  login: string;
  password: string;
  fetchUserTasks: ({ jiraUserName, login, password }: FetchUserTasksArguments) => Promise<UserTasks>;
  team: ITeamConfig;
}): Promise<Record<string, string[]>> {
  const tasks = team.employees.map((employee) =>
    fetchUserTasks({
      jiraUserName: employee.jiraUsername,
      login,
      password,
      query: employee.employeeJiraTaskQuery ?? employeeJiraTaskQuery,
    })
  );

  console.log(`Fetching tasks from Jira for employees. Please wait...`);
  const tasksRows = await Promise.all(tasks);
  if (team.teamLead.employeeJiraTaskQuery) {
    tasksRows.push(
      await fetchUserTasks({
        jiraUserName: team.teamLead.jiraUsername,
        login,
        password,
        query: team.teamLead.employeeJiraTaskQuery,
      })
    );
  } else {
    tasksRows.push(makeTeamLeadJiraTasks(tasksRows, team.teamLead.jiraUsername));
  }

  return makeSortedUserTasksByEmployeeUsername(tasksRows);
}
