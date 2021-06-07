import inquirer from "inquirer";
import xlsx from "xlsx";
import { OUTPUT_FORMAT_ARRAY_OF_ARRAYS } from "../constants/constant";

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

  const nonWorkingHoursJson: string[][] = xlsx.utils.sheet_to_json(workSheet, {
    defval: "",
    header: OUTPUT_FORMAT_ARRAY_OF_ARRAYS,
    raw: false,
    blankrows: false,
    dateNF: 'dd"."mm"."yyyy',
  });

  return nonWorkingHoursJson.map((rowWithEmptyCellAtTheBeginning) =>
    rowWithEmptyCellAtTheBeginning.splice(1)
  );
}
