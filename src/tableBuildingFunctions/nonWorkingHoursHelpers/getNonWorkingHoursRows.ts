import { ITableData } from "../../models/ITableData";
import { isNumeric } from "../../utils/isNumeric";
import { CommonValue } from "../types";

export async function getNonWorkingHoursRows(
  tableData: ITableData,
  nonWorkingHoursFile: string[][]
): Promise<CommonValue[][]> {
  const employees = tableData.employees.map((employee) => employee.name);
  employees.push(tableData.teamLead.name);

  return nonWorkingHoursFile
    .filter((row) => row.some((cell) => employees.includes(cell)))
    .map((row) => row.map((value) => (isNumeric(value) ? Number(value) : value)));
}
