import fetch from "node-fetch";
import { jiraJsonFetchResult } from "./types";

export async function fetchJiraUserTasks({
  jiraUserName,
  login,
  password,
}: {
  jiraUserName: string;
  login: string;
  password: string;
}): Promise<string[]> {
  const authorizationKey = Buffer.from(`${login}:${password}`).toString(
    "base64"
  );

  const fetchResult = await fetch(
    `https://jiraosl.firmglobal.com/rest/api/2/search?jql=status+changed+BY+${jiraUserName}+after+startOfMonth()+OR+created+%3E%3D+startOfMonth()+AND+creator+%3D+${jiraUserName}&fields=key`,
    {
      method: "get",
      headers: {
        Authorization: `Basic ${authorizationKey}`,
      },
    }
  );
  const jsonResult: jiraJsonFetchResult = await fetchResult.json();

  return jsonResult.issues.map((elem) => elem.key);
}
