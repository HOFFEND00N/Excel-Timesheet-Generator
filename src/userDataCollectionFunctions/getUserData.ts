import { getCredentials } from "./jiraHelpers/getCredentials";
import { getNonWorkingHoursFile } from "./nonWorkingHoursHelpers/getNonWorkingHoursFile";
import { HoursByEmployees, UserData } from "../tableBuildingFunctions/types";
import { errorHandler } from "../utils/errorHandler";
import { ITeamConfig } from "../models/ITeamConfig";

export async function getUserData({
  config,
  workingHoursPerMonth,
}: {
  config: ITeamConfig;
  workingHoursPerMonth: number;
}): Promise<UserData> {
  let login, password;
  if (process.env.login === undefined || process.env.password === undefined) {
    ({ login, password } = await errorHandler(getCredentials));
  } else {
    login = process.env.login;
    password = process.env.password;
  }

  const nonWorkingHoursFile = await errorHandler(getNonWorkingHoursFile);

  const workingHoursByEmployeesUsername: HoursByEmployees = {};
  for (const employee of [...config.employees, config.teamLead]) {
    workingHoursByEmployeesUsername[employee.jiraUsername] = employee.workingHoursPerMonth ?? workingHoursPerMonth;
  }

  return { login, password, nonWorkingHoursFile, workingHoursByEmployeesUsername };
}
