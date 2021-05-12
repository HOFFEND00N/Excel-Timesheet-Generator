import fetch from "node-fetch";
import create from "prompt-sync";

const prompt = create();

export function getCredentials() {
  console.log("Please enter your credentials for Jira");
  const login: string = prompt("login: ");
  const password: string = prompt("password: ");
  return { login, password };
}

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

export async function getEmployeesTasks({
  fetchUserTasks,
  jiraUserNames,
  getCredentials,
}: {
  fetchUserTasks: ({
    jiraUserName,
    login,
    password,
  }: {
    jiraUserName: string;
    login: string;
    password: string;
  }) => Promise<string[]>;
  jiraUserNames: string[];
  getCredentials: () => {
    login: string;
    password: string;
  };
}) {
  const tasks: string[][] = [];
  //tests fails here, i ask for credentials while mocking fetchUserTasks()
  const { login, password } = getCredentials();

  for (const jiraUserName of jiraUserNames) {
    try {
      tasks.push(await fetchUserTasks({ jiraUserName, login, password }));
    } catch (res) {
      console.log(res);
    }
  }

  return tasks;
}
