import { ParsedJiraResponse } from "./types";

export function makeTeamLeadJiraTasks(
  teamTasks: ParsedJiraResponse[][]
): ParsedJiraResponse[] {
  const jiraEpicTasks = teamTasks.map((userTasks) =>
    userTasks
      .filter((task) => task.epicKey !== null)
      .map((task) => task.epicKey)
  );

  const teamLeadTasks = new Set<string>([].concat(...jiraEpicTasks));

  return [...teamLeadTasks].map((task) => {
    return { taskKey: task, epicKey: null };
  });
}
