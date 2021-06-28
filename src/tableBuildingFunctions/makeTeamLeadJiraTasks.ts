import { UserTasks } from "./types";

export function makeTeamLeadJiraTasks(
  teamTasks: UserTasks[],
  jiraUserName: string
): UserTasks {
  const teamLeadTasksWithDuplications = teamTasks.map((userTasks) =>
    userTasks.tasks
      .filter((task) => task.epicKey != "" && task.epicKey != null)
      .map((task) => task.epicKey)
  );

  const teamLeadTasks = new Set<string>(teamLeadTasksWithDuplications.flat());

  return {
    userName: jiraUserName,
    tasks: [...teamLeadTasks].map((task) => {
      return { taskKey: task, epicKey: "" };
    }),
  };
}
