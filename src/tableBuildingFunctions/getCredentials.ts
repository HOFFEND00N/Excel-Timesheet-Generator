import create from "prompt-sync";

const prompt = create();

export function getCredentials() {
  console.log("Please enter your credentials for Jira");
  const login: string = prompt("login: ");
  const password: string = prompt("password: ");
  return { login, password };
}
