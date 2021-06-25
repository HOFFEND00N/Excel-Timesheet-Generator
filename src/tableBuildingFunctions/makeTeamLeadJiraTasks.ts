import { ParsedJiraResponse } from "./types";

export function makeTeamLeadJiraTasks(
  teamTasks: ParsedJiraResponse[][]
): ParsedJiraResponse[] {
  const teamLeadTasksWithDuplications = teamTasks.map((userTasks) =>
    userTasks.filter((task) => task.epicKey != "").map((task) => task.epicKey)
  );

  const teamLeadTasks = new Set<string>(teamLeadTasksWithDuplications.flat());

  return [...teamLeadTasks].map((task) => {
    return { taskKey: task, epicKey: "" };
  });
}
