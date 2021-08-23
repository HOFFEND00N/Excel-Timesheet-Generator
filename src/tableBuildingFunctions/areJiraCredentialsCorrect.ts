import fetch from "node-fetch";

export async function areJiraCredentialsCorrect({ login, password }: { login: string; password: string }) {
  const authorizationKey = Buffer.from(`${login}:${password}`).toString("base64");

  const fetchResult = await fetch(`https://jiraosl.firmglobal.com/rest/api/2/search`, {
    method: "get",
    headers: {
      Authorization: `Basic ${authorizationKey}`,
    },
  });

  if (fetchResult.status === 403)
    throw new Error("Your account has been locked out, because of too many attempts. Please unlock your account.");
  return fetchResult.status === 200;
}
