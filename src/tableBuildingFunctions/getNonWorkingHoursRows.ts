import { TableData } from "../classes/TableData";
import { CommonValue } from "./types";

export async function getNonWorkingHoursRows(
  tableData: TableData,
  getNonWorkingHoursFile: () => Promise<string[][]>
): Promise<CommonValue[][]> {
  const nonWorkingHoursJson = await getNonWorkingHoursFile();
  const employees = tableData.employees.map((employee) => employee.name);

  const nonWorkingHoursRows: CommonValue[][] = nonWorkingHoursJson.filter(
    (row) => row.some((cell) => employees.includes(cell))
  );
  return nonWorkingHoursRows.map((row) =>
    row.map((value) => (isNumeric(value) ? Number(value) : value))
  );
}

function isNumeric(value): boolean {
  const numberValue = Number(value);
  return !isNaN(numberValue) && value != "";
}
