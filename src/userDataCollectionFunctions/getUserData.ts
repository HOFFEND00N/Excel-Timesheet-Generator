import { getNonWorkingHoursFile } from "./nonWorkingHoursHelpers/getNonWorkingHoursFile";
import { HoursByEmployees, UserData } from "../tableBuildingFunctions/types";
import { errorHandler } from "../utils/errorHandler";
import { IEmployee } from "../models/IEmployee";

export async function getUserData({
  workingHoursPerMonth,
  team,
}: {
  workingHoursPerMonth: number;
  team: IEmployee[];
}): Promise<UserData> {
  const nonWorkingHoursFile = await errorHandler(getNonWorkingHoursFile);

  const workingHoursByEmployeesUsername: HoursByEmployees = {};
  for (const employee of team) {
    workingHoursByEmployeesUsername[employee.jiraUsername] = employee.workingHoursPerMonth ?? workingHoursPerMonth;
  }

  return { nonWorkingHoursFile, workingHoursByEmployeesUsername };
}
