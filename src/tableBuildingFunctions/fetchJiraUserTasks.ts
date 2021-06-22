import fetch from "node-fetch";
import {
  FetchUserTasksArguments,
  JiraResponse,
  ParsedJiraResponse,
} from "./types";
import { TEAMLEAD_JIRA_USERNAME } from "../constants/constant";

export async function fetchJiraUserTasks({
  jiraUserName,
  login,
  password,
}: FetchUserTasksArguments): Promise<ParsedJiraResponse[]> {
  if (TEAMLEAD_JIRA_USERNAME == jiraUserName) return Promise.resolve([]);

  const authorizationKey = Buffer.from(`${login}:${password}`).toString(
    "base64"
  );

  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);
  const taskUpdated = `${currentDate.getFullYear()}/${
    currentDate.getMonth() + 1
  }/1`;

  const fetchResult = await fetch(
    `https://jiraosl.firmglobal.com/rest/api/2/search?jql=status in ("In Progress", "In Code Review", "IN QA", "QA Verified", Investigation, "Code Completed") AND assignee in (${jiraUserName}) and updated >= "${taskUpdated}" or status CHANGED BY ${jiraUserName} after startOfMonth()&fields=key, customfield_10006,`,
    {
      method: "get",
      headers: {
        Authorization: `Basic ${authorizationKey}`,
      },
    }
  );
  const jiraResponse: JiraResponse = await fetchResult.json();

  return jiraResponse.issues.map((elem) => {
    return { taskKey: elem.key, epicKey: elem.fields.customfield_10006 };
  });
}
