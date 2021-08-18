import { UserTasks } from "./types";

export function makeSortedUserTasksByEmployeeUsername(
  usersTasks: UserTasks[]
): Record<string, string[]> {
  const userTasksByEmployee: Record<string, string[]> = {};
  for (const userTasks of usersTasks) {
    userTasksByEmployee[userTasks.userName] = userTasks.tasks
      .map((item) => item.taskKey)
      .sort();
  }
  return userTasksByEmployee;
}
