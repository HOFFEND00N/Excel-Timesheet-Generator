import xlsx from "xlsx";
import { OUTPUT_FORMAT_ARRAY_OF_ARRAYS } from "../../constants/constant";
import { isNonWorkingHoursFileValid } from "./isNonWorkingHoursFileValid";

export function readNonWorkingHoursFile(path: string) {
  const nonWorkingHoursFile = xlsx.readFile(path, {
    cellText: false,
    cellDates: true,
  });

  const nonWorkingHoursFileSheetName = nonWorkingHoursFile.SheetNames[0];
  const workSheet = nonWorkingHoursFile.Sheets[nonWorkingHoursFileSheetName];

  const nonWorkingHoursRows: string[][] = xlsx.utils
    .sheet_to_json(workSheet, {
      defval: "",
      header: OUTPUT_FORMAT_ARRAY_OF_ARRAYS,
      raw: false,
      blankrows: false,
      dateNF: 'dd"."mm"."yyyy',
    })
    .map(removeEmptyCellAtTheBeginning);

  if (!isNonWorkingHoursFileValid(nonWorkingHoursRows)) throw new Error("This is not the file with non working hours.");

  return nonWorkingHoursRows;
}

function removeEmptyCellAtTheBeginning(row: string[]) {
  return row.splice(row.findIndex((value) => value !== ""));
}
