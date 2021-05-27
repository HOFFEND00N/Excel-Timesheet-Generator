import { TableData } from "../classes/TableData";
import { CommonValue } from "./types";

export async function getNonWorkingHoursRows(
  tableData: TableData,
  getNonWorkingHoursFile: () => Promise<string[][]>
): Promise<CommonValue[][]> {
  const nonWorkingHoursJson = await getNonWorkingHoursFile();

  const nonWorkingHoursRows: CommonValue[][] = nonWorkingHoursJson.filter(
    (row) => {
      for (const cellValue of row)
        if (tableData.employees.find((employee) => employee.name == cellValue))
          return true;
      return false;
    }
  );

  for (const row of nonWorkingHoursRows) {
    for (let i = 0; i < row.length; i++) {
      if (isNumeric(row[i])) row[i] = Number(row[i]);
    }
  }

  return nonWorkingHoursRows;
}

function isNumeric(value): boolean {
  const numberValue = Number(value);
  return !isNaN(numberValue) && value != "";
}
