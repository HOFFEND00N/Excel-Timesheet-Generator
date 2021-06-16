import { ParsedJiraResponse } from "./types";

export function makeTeamLeadJiraTasks(
  teamTasks: ParsedJiraResponse[][]
): ParsedJiraResponse[] {
  const jiraEpicTasks = teamTasks.map((userTasks) =>
    userTasks
      .filter((task) => task.epicKey !== null)
      .map((task) => task.epicKey)
  );

  const teamLeadTasks = new Set<string>();

  for (const jiraEpicUserTasks of jiraEpicTasks) {
    for (const jiraEpicUserTask of jiraEpicUserTasks) {
      teamLeadTasks.add(jiraEpicUserTask);
    }
  }

  return [...teamLeadTasks].map((task) => {
    return { taskKey: task, epicKey: null };
  });
}
