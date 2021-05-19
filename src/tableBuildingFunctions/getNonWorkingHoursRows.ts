import { getNonWorkingHoursFile } from "./getNonWorkingHoursFile";
import xlsx from "xlsx";
import { TableData } from "../classes/TableData";

export async function getNonWorkingHoursRows(
  tableData: TableData
): Promise<string[][]> {
  const nonWorkingHoursFile = await getNonWorkingHoursFile();
  const nonWorkingHoursFileSheetName = nonWorkingHoursFile.SheetNames[0];
  const workSheet = nonWorkingHoursFile.Sheets[nonWorkingHoursFileSheetName];

  //header: 1 means that method return array of arrays
  const json: [][] = xlsx.utils.sheet_to_json(workSheet, {
    defval: "",
    header: 1,
    raw: false,
    blankrows: false,
    dateNF: 'dd"."mm"."yyyy',
  });

  const result = [];
  //remove "" in the beginning of row
  for (let i = 0; i < json.length; i++) {
    json[i].shift();
  }

  for (const row of json) {
    for (const cellValue of row) {
      if (tableData.employees.find((item) => item.name == cellValue))
        result.push(row);
    }
  }

  return result;
}
