import fetch from "node-fetch";

export async function fetchJiraUserTasks({
  jiraUserName,
  login,
  password,
}: {
  jiraUserName: string;
  login: string;
  password: string;
}) {
  const authorizationKey = Buffer.from(`${login}:${password}`).toString(
    "base64"
  );

  const userTasks: string[] = [];
  const fetchResult = await fetch(
    `https://jiraosl.firmglobal.com/rest/api/2/search?jql=status+changed+BY+${jiraUserName}+after+"2021/04/01"+OR+created+%3E%3D+"2021/04/01"+AND+creator+%3D+${jiraUserName}&fields=key`,
    {
      method: "get",
      headers: {
        Authorization: `Basic ${authorizationKey}`,
      },
    }
  );
  const jsonResult = await fetchResult.json();
  jsonResult.issues.forEach((elem) => userTasks.push(elem.key));

  return userTasks;
}
