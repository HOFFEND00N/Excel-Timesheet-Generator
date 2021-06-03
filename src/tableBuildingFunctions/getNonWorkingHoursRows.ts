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

  return nonWorkingHoursRows.map((row) =>
    row.map((value) => (isNumeric(value) ? Number(value) : value))
  );
}

function isNumeric(value): boolean {
  const numberValue = Number(value);
  return !isNaN(numberValue) && value != "";
}
