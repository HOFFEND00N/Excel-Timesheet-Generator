import fetch from "node-fetch";
import { jiraUserNames } from "../constants/constant";

export async function getTasks() {
  const tasks = [];

  for (const jiraUserName of jiraUserNames) {
    const userTasks = [];
    try {
      const fetchResult = await fetch(
        `https://jiraosl.firmglobal.com/rest/api/2/search?jql=status+changed+BY+${jiraUserName}+after+startOfMonth()+OR+created+%3E%3D+startOfMonth()+AND+creator+%3D+${jiraUserName}&fields=key`,
        {
          method: "get",
          headers: {
            Authorization: "Basic aXZhbi5wZXRyb3Y6WEVqQzZUKnNlXFd5RDRxZQ==",
            Cookie:
              "JSESSIONID=AEEBFFEAEDE54DF705EC65B01B4720B1; atlassian.xsrf.token=BIFY-V7B9-1HF2-S98M_97096643c633c2f72b8c12ca6df9ffe825f911c7_lin",
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
