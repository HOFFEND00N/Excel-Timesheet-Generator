import inquirer from "inquirer";
import { areJiraCredentialsCorrect } from "./areJiraCredentialsCorrect";

export async function getCredentials(): Promise<{
  login: string;
  password: string;
}> {
  console.log("Please enter your credentials for Jira");
  const { login } = await inquirer.prompt([{ type: "input", name: "login", message: "login: " }]);

  const { password } = await inquirer.prompt([{ type: "password", name: "password", message: "password: " }]);

  const canAuthorize = await areJiraCredentialsCorrect({
    login,
    password,
  });
  if (!canAuthorize) {
    throw new Error("Wrong credentials. Please try again");
  }

  return { login, password };
}
