import inquirer from "inquirer";
import xlsx from "xlsx";

export async function getNonWorkingHoursFile() {
  console.log("Enter path to a excel file with non-working hours please ");
  const { nonWorkingHoursFilePath } = await inquirer.prompt([
    { type: "input", name: "nonWorkingHoursFilePath", message: "path: " },
  ]);
  return xlsx.readFile(nonWorkingHoursFilePath, {
    cellText: false,
    cellDates: true,
  });
}
