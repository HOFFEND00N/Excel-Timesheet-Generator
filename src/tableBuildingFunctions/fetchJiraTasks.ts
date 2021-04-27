import fetch from "node-fetch";
import { jiraUserNames } from "../constants/constant";

export async function getTasks(server) {
  const tasks: string[][] = [];

  for (const jiraUserName of jiraUserNames) {
    const userTasks: string[] = [];
    try {
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

      tasks.push(userTasks);
    } catch (res) {
      console.log(res);
    }
  }

  return tasks;
}
