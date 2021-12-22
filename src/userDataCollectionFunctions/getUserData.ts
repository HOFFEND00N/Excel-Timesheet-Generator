import { getNonWorkingHoursFile } from "./nonWorkingHoursHelpers/getNonWorkingHoursFile";
import { HoursByEmployees, UserData } from "../tableBuildingFunctions/types";
import { errorHandler } from "../utils/errorHandler";
import { IEmployee } from "../models/IEmployee";
import { ICredentials } from "../models/ICredentials";
import { getCredentials } from "./credentialsHelpers/getCredentials";

export async function getUserData({
  workingHoursPerMonth,
  team,
  credentials,
}: {
  workingHoursPerMonth: number;
  team: IEmployee[];
  credentials: ICredentials;
}): Promise<UserData> {
  const { login, password } = await getCredentials(credentials);

  const nonWorkingHoursFile = await errorHandler(getNonWorkingHoursFile);

  const workingHoursByEmployeesUsername: HoursByEmployees = {};
  for (const employee of team) {
    workingHoursByEmployeesUsername[employee.jiraUsername] = employee.workingHoursPerMonth ?? workingHoursPerMonth;
  }

  return { login, password, nonWorkingHoursFile, workingHoursByEmployeesUsername };
}
