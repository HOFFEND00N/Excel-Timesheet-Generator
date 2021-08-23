import inquirer from "inquirer";

export async function getCredentials(): Promise<{
  login: string;
  password: string;
}> {
  console.log("Please enter your credentials for Jira");
  const { login } = await inquirer.prompt([{ type: "input", name: "login", message: "login: " }]);

  const { password } = await inquirer.prompt([{ type: "password", name: "password", message: "password: " }]);

  return { login, password };
}
