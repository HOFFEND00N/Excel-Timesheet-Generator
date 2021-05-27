import inquirer from "inquirer";
import xlsx from "xlsx";

export async function getNonWorkingHoursFile(): Promise<string[][]> {
  console.log("Enter path to a excel file with non-working hours please ");
  const { nonWorkingHoursFilePath } = await inquirer.prompt([
    { type: "input", name: "nonWorkingHoursFilePath", message: "path: " },
  ]);
  const nonWorkingHoursFile = xlsx.readFile(nonWorkingHoursFilePath, {
    cellText: false,
    cellDates: true,
  });

  const nonWorkingHoursFileSheetName = nonWorkingHoursFile.SheetNames[0];
  const workSheet = nonWorkingHoursFile.Sheets[nonWorkingHoursFileSheetName];

  //header: 1 means that method return array of arrays
  const nonWorkingHoursJson: string[][] = xlsx.utils.sheet_to_json(workSheet, {
    defval: "",
    header: 1,
    raw: false,
    blankrows: false,
    dateNF: 'dd"."mm"."yyyy',
  });

  //remove "" in the beginning of row
  for (let i = 0; i < nonWorkingHoursJson.length; i++) {
    nonWorkingHoursJson[i].shift();
  }

  return nonWorkingHoursJson;
}
