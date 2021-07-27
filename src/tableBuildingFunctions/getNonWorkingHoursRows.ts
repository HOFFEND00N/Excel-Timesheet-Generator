import { TableData } from "../classes/TableData";
import { CommonValue } from "./types";
import { isNumeric } from "../utils/isNumeric";

export async function getNonWorkingHoursRows(
  tableData: TableData,
  getNonWorkingHoursFile: () => Promise<string[][]>
): Promise<CommonValue[][]> {
  const nonWorkingHoursJson = await getNonWorkingHoursFile();
  const employees = tableData.employees.map((employee) => employee.name);
  employees.push(tableData.teamLead.name);

  return nonWorkingHoursJson
    .filter((row) => row.some((cell) => employees.includes(cell)))
    .map((row) =>
      row.map((value) => (isNumeric(value) ? Number(value) : value))
    );
}
