import inquirer from "inquirer";
import { isNumeric } from "../utils/isNumeric";

export async function getWorkingHoursForMonth(): Promise<number> {
  const { workingHoursPerMonth } = await inquirer.prompt([
    {
      type: "input",
      name: "workingHoursPerMonth",
      message: "Enter working hours for the month: ",
      validate: (workingHoursPerMonth) => {
        if (!isNumeric(workingHoursPerMonth) || workingHoursPerMonth <= 0)
          return "Please enter correct working hours for month";
        return true;
      },
    },
  ]);
  return workingHoursPerMonth;
}
//TODO: test isNumeric()
