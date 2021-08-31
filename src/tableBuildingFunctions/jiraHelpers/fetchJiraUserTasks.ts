import fetch from "node-fetch";
import { EPIC_KEY } from "../../constants/constant";
import { FetchUserTasksArguments, JiraResponse, UserTasks } from "../types";

export async function fetchJiraUserTasks({
  jiraUserName,
  login,
  password,
  query,
}: FetchUserTasksArguments): Promise<UserTasks> {
  const authorizationKey = Buffer.from(`${login}:${password}`).toString("base64");

  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);
  const taskUpdated = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/1`;

  query = query
    .replace(/\${jiraUserName}/g, jiraUserName)
    .replace("${taskUpdated}", taskUpdated)
    .replace("${EPIC_KEY}", EPIC_KEY);

  const fetchResult = await fetch(query, {
    method: "get",
    headers: {
      Authorization: `Basic ${authorizationKey}`,
    },
  });
  const jiraResponse: JiraResponse = await fetchResult.json();

  const userTasks = jiraResponse.issues.map((issue) => {
    return { taskKey: issue.key, epicKey: issue.fields[EPIC_KEY] };
  });

  return { userName: jiraUserName, tasks: userTasks };
}
