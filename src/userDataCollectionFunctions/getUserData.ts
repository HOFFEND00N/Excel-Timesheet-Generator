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
  const workingHoursByEmployeesUsername = await errorHandler(getWorkingHoursByEmployeesUsername, {
    employees: [...config.employees, config.teamLead],
    getWorkingHoursPerMonth,
    shouldUpdateEmployeeMonthRate,
    chooseEmployees,
  });

  const nonWorkingHoursFile = await errorHandler(getNonWorkingHoursFile);

  const { login, password } = await errorHandler(getCredentials);

  return { login, password, nonWorkingHoursFile, workingHoursByEmployeesUsername };
}
