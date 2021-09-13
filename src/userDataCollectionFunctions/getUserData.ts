import { getCredentials } from "./jiraHelpers/getCredentials";
import { getWorkingHoursByEmployeesUsername } from "./workingHoursHelpers/getWorkingHoursByEmployeesUsername";
import { IConfig } from "../models/IConfig";
import { getWorkingHoursPerMonth } from "./workingHoursHelpers/getWorkingHoursPerMonth";
import { shouldUpdateEmployeeMonthRate } from "./workingHoursHelpers/shouldUpdateEmployeeMonthRate";
import { chooseEmployees } from "./workingHoursHelpers/chooseEmployees";
import { getNonWorkingHoursFile } from "./getNonWorkingHoursFile";
import { UserData } from "../tableBuildingFunctions/types";
import { errorHandler } from "../utils/errorHandler";

export async function getUserData(config: IConfig): Promise<UserData> {
  let login, password;
  if (process.env.login === undefined || process.env.password === undefined) {
    ({ login, password } = await errorHandler(getCredentials));
  } else {
    login = process.env.login;
    password = process.env.password;
  }

  const nonWorkingHoursFile = await errorHandler(getNonWorkingHoursFile);

  const workingHoursByEmployeesUsername = await errorHandler(getWorkingHoursByEmployeesUsername, {
    employees: [...config.employees, config.teamLead],
    getWorkingHoursPerMonth,
    shouldUpdateEmployeeMonthRate,
    chooseEmployees,
  });

  return { login, password, nonWorkingHoursFile, workingHoursByEmployeesUsername };
}
