import { isNumeric } from "../../utils/isNumeric";
import { CommonValue } from "../types";
import { ITeamConfig } from "../../models/ITeamConfig";

export async function getNonWorkingHoursRows(
  config: ITeamConfig,
  nonWorkingHoursFile: string[][]
): Promise<CommonValue[][]> {
  const employees = config.employees.map((employee) => employee.name);
  employees.push(config.teamLead.name);

  return nonWorkingHoursFile
    .filter((row) => row.some((cell) => employees.includes(cell)))
    .map((row) => row.map((value) => (isNumeric(value) ? Number(value) : value)));
}
