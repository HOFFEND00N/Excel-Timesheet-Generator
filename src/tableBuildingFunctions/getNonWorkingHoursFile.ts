import inquirer from "inquirer";
import xlsx from "xlsx";
import { OUTPUT_FORMAT_ARRAY_OF_ARRAYS } from "../constants/constant";
import inquirer_autocomplete_prompt from "inquirer-autocomplete-prompt";
import { searchFilesAndDirectories } from "./searchFilesAndDirectories";

export async function getNonWorkingHoursFile(): Promise<string[][]> {
  inquirer.registerPrompt("autocomplete", inquirer_autocomplete_prompt);
  console.log("Enter path to a excel file with non-working hours please ");
  const { nonWorkingHoursFilePath } = await inquirer.prompt([
    {
      type: "autocomplete",
      name: "nonWorkingHoursFilePath",
      message: "path: ",
      source: searchFilesAndDirectories,
      suggestOnly: true,
    },
  ]);
  const nonWorkingHoursFile = xlsx.readFile(nonWorkingHoursFilePath, {
    cellText: false,
    cellDates: true,
  });

  const nonWorkingHoursFileSheetName = nonWorkingHoursFile.SheetNames[0];
  const workSheet = nonWorkingHoursFile.Sheets[nonWorkingHoursFileSheetName];

  const nonWorkingHoursRows: string[][] = xlsx.utils.sheet_to_json(workSheet, {
    defval: "",
    header: OUTPUT_FORMAT_ARRAY_OF_ARRAYS,
    raw: false,
    blankrows: false,
    dateNF: 'dd"."mm"."yyyy',
  });

  return nonWorkingHoursRows.map(removeEmptyCellAtTheBeginning);
}

function removeEmptyCellAtTheBeginning(row: string[]) {
  return row.splice(row.findIndex((value) => value !== ""));
}
