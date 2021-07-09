import fetch from "node-fetch";
import { FetchUserTasksArguments, JiraResponse, UserTasks } from "./types";
import { EPIC_KEY, TASKS_STATUSES } from "../constants/constant";

export async function fetchJiraUserTasks({
  jiraUserName,
  login,
  password,
}: FetchUserTasksArguments): Promise<UserTasks> {
  const authorizationKey = Buffer.from(`${login}:${password}`).toString(
    "base64"
  );

  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);
  const taskUpdated = `${currentDate.getFullYear()}/${
    currentDate.getMonth() + 1
  }/1`;

  const tasksStatuses = TASKS_STATUSES.map((status) => '"' + status + '"').join(
    ", "
  );
  const query = `https://jiraosl.firmglobal.com/rest/api/2/search?jql=status in (${tasksStatuses}) AND assignee in (${jiraUserName}) and updated >= "${taskUpdated}" or status CHANGED BY ${jiraUserName} after startOfMonth()&fields=key, ${EPIC_KEY},`;

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
