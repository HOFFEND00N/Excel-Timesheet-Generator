import { Employee } from "../classes/Employee";
import fetch from "node-fetch";

export async function isJiraCredentialsCorrect({
  login,
  password,
  teamLead,
}: {
  login: string;
  password: string;
  teamLead: Employee;
}) {
  const authorizationKey = Buffer.from(`${login}:${password}`).toString(
    "base64"
  );

  const fetchResult = await fetch(
    `https://jiraosl.firmglobal.com/rest/api/2/search?jql=status CHANGED BY ${teamLead.jiraUsername}`,
    {
      method: "get",
      headers: {
        Authorization: `Basic ${authorizationKey}`,
      },
    }
  );

  if (fetchResult.status == 403)
    throw new Error(
      "Your account has been locked out, because of too many attempts. Please unlock your account."
    );
  return fetchResult.status != 401;
}
