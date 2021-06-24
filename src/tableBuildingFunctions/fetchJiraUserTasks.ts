import fetch from "node-fetch";
import {
  FetchUserTasksArguments,
  JiraResponse,
  ParsedJiraResponse,
} from "./types";
import { EPIC_KEY } from "../constants/constant";

export async function fetchJiraUserTasks({
  jiraUserName,
  login,
  password,
}: FetchUserTasksArguments): Promise<ParsedJiraResponse[]> {
  const authorizationKey = Buffer.from(`${login}:${password}`).toString(
    "base64"
  );

  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);
  const taskUpdated = `${currentDate.getFullYear()}/${
    currentDate.getMonth() + 1
  }/1`;

  const fetchResult = await fetch(
    `https://jiraosl.firmglobal.com/rest/api/2/search?jql=status in ("In Progress", "In Code Review", "IN QA", "QA Verified", Investigation, "Code Completed") AND assignee in (${jiraUserName}) and updated >= "${taskUpdated}" or status CHANGED BY ${jiraUserName} after startOfMonth()&fields=key, ${EPIC_KEY},`,
    {
      method: "get",
      headers: {
        Authorization: `Basic ${authorizationKey}`,
      },
    }
  );
  const jiraResponse: JiraResponse = await fetchResult.json();

  return jiraResponse.issues.map((issue) => {
    return { taskKey: issue.key, epicKey: issue.fields[EPIC_KEY] };
  });
}
