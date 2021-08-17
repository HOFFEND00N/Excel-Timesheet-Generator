import inquirer from "inquirer";
import { Employee } from "../classes/Employee";

export async function getChosenEmployeesNames(employees: Employee[]) {
  const { chosenEmployees } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "chosenEmployees",
      message:
        "Please select employees with previously entered working hours per month rate",
      choices: [...employees.map((employee) => employee.name)],
    },
  ]);
  return chosenEmployees;
}
