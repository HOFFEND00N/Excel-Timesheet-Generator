import inquirer from "inquirer";

export async function getCredentials() {
  console.log("Please enter your credentials for Jira");

  let login: string, password: string;
  await inquirer
    .prompt([{ type: "input", name: "value", message: "login: " }])
    .then((answer) => {
      login = answer.value;
    });

  await inquirer
    .prompt([{ type: "password", name: "value", message: "password: " }])
    .then((answer) => {
      password = answer.value;
    });

  return { login, password };
}
