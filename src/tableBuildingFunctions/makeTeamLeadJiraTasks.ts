import { UserTasks } from "./types";

export function makeTeamLeadJiraTasks(teamTasks: UserTasks[], jiraUserName: string): UserTasks {
  const teamLeadTasksWithDuplications = teamTasks.map((userTasks) =>
    userTasks.tasks.filter((task) => task.epicKey != undefined).map((task) => task.epicKey)
  );

  const teamLeadTasks = new Set(teamLeadTasksWithDuplications.flat());

  return {
    userName: jiraUserName,
    tasks: [...teamLeadTasks].map((task: string) => {
      return { taskKey: task, epicKey: undefined };
    }),
  };
}
