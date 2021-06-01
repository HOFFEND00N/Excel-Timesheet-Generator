import inquirer from "inquirer";

export async function getWorkingHoursForMonth(): Promise<number> {
  const { workingHoursPerMonth } = await inquirer.prompt([
    {
      type: "input",
      name: "workingHoursPerMonth",
      message: "Enter working hours for the month: ",
    },
  ]);
  return Number(workingHoursPerMonth);
}
