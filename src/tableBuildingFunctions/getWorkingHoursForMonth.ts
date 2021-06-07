import inquirer from "inquirer";

export async function getWorkingHoursForMonth(): Promise<number> {
  const { workingHoursPerMonth } = await inquirer.prompt([
    {
      type: "number",
      name: "workingHoursPerMonth",
      message: "Enter working hours for the month: ",
    },
  ]);
  return workingHoursPerMonth;
}
