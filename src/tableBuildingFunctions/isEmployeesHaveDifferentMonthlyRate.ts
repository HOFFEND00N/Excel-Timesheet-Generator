import inquirer from "inquirer";

export async function isEmployeesHaveDifferentMonthlyRate() {
  const { isEmployeesHaveDifferentMonthlyRate } = await inquirer.prompt([
    {
      type: "input",
      name: "isEmployeesHaveDifferentMonthlyRate",
      message: "Does any employee has different monthly hours rate? (Y/N)",
      validate: (isEmployeesHaveDifferentMonthlyRate) => {
        if (!["y", "Y", "n", "N"].includes(isEmployeesHaveDifferentMonthlyRate))
          return "Please enter correct symbol, (Y/N)";
        return true;
      },
    },
  ]);
  return ["y", "Y"].includes(isEmployeesHaveDifferentMonthlyRate);
}
