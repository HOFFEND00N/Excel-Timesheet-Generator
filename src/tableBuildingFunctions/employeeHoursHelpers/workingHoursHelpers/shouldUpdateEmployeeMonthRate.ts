import inquirer from "inquirer";

export async function shouldUpdateEmployeeMonthRate() {
  const { shouldUpdateEmployeeMonthRate } = await inquirer.prompt([
    {
      type: "input",
      name: "shouldUpdateEmployeeMonthRate",
      message: "Does any employee has different monthly hours rate? (Y/N)",
      validate: (shouldUpdateEmployeeMonthRate) => {
        if (!["y", "Y", "n", "N"].includes(shouldUpdateEmployeeMonthRate)) return "Please enter correct symbol, (Y/N)";
        return true;
      },
    },
  ]);
  return ["y", "Y"].includes(shouldUpdateEmployeeMonthRate);
}
