import fetch from "node-fetch";

export async function fetchJiraUserTasks(jiraUserName: string) {
  const userTasks: string[] = [];
  const fetchResult = await fetch(
    `https://jiraosl.firmglobal.com/rest/api/2/search?jql=status+changed+BY+${jiraUserName}+after+startOfMonth()+OR+created+%3E%3D+startOfMonth()+AND+creator+%3D+${jiraUserName}&fields=key`,
    {
      method: "get",
      headers: {
        Authorization: "Basic ",
      },
    }
  );
  const jsonResult = await fetchResult.json();
  jsonResult.issues.forEach((elem) => userTasks.push(elem.key));

  return userTasks;
}

export async function getEmployeesTasks(
  fetchUserTasks: (jiraUserName: string) => string[],
  jiraUserNames: string[]
) {
  const tasks: string[][] = [];

  for (const jiraUserName of jiraUserNames) {
    try {
      tasks.push(fetchUserTasks(jiraUserName));
    } catch (res) {
      console.log(res);
    }
  }

  return tasks;
}
