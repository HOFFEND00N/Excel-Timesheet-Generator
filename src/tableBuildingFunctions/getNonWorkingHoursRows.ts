import { getNonWorkingHoursFile } from "./getNonWorkingHoursFile";
import xlsx from "xlsx";
import { TableData } from "../classes/TableData";

export async function getNonWorkingHoursRows(
  tableData: TableData
): Promise<(string | number)[][]> {
  const nonWorkingHoursFile = await getNonWorkingHoursFile();
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

  const nonWorkingHoursRows: (string | number)[][] = [];
  //remove "" in the beginning of row
  for (let i = 0; i < nonWorkingHoursJson.length; i++) {
    nonWorkingHoursJson[i].shift();
  }

  for (const row of nonWorkingHoursJson) {
    for (const cellValue of row) {
      if (tableData.employees.find((item) => item.name == cellValue))
        nonWorkingHoursRows.push(row);
    }
  }

  for (const row of nonWorkingHoursRows) {
    for (let i = 0; i < row.length; i++) {
      if (isNumeric(row[i])) row[i] = Number(row[i]);
    }
  }

  return nonWorkingHoursRows;
}

function isNumeric(value): boolean {
  const numberValue = Number(value);
  if (!isNaN(numberValue) && value != "") return true;
  return false;
}
