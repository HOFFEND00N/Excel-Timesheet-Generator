import { getCredentials } from "./jiraHelpers/getCredentials";
import { areJiraCredentialsCorrect } from "./jiraHelpers/areJiraCredentialsCorrect";
import { getWorkingHoursByEmployeesUsername } from "./workingHoursHelpers/getWorkingHoursByEmployeesUsername";
import { TableData } from "../classes/TableData";
import { getWorkingHoursPerMonth } from "./workingHoursHelpers/getWorkingHoursPerMonth";
import { shouldUpdateEmployeeMonthRate } from "./workingHoursHelpers/shouldUpdateEmployeeMonthRate";
import { chooseEmployees } from "./workingHoursHelpers/chooseEmployees";
import { getNonWorkingHoursFile } from "./getNonWorkingHoursFile";
import { UserData } from "../tableBuildingFunctions/types";

export async function getUserData(tableData: TableData): Promise<UserData> {
  const workingHoursByEmployeesUsername = await getWorkingHoursByEmployeesUsername({
    employees: [...tableData.employees, tableData.teamLead],
    getWorkingHoursPerMonth,
    shouldUpdateEmployeeMonthRate,
    chooseEmployees,
  });

  const nonWorkingHoursFile = await getNonWorkingHoursFile();

  const { login, password } = await getCredentials();
  const cahAuthorize = await areJiraCredentialsCorrect({
    login,
    password,
  });
  if (!cahAuthorize) {
    throw new Error("Wrong credentials. Please try again");
  }

  return { login, password, nonWorkingHoursFile, workingHoursByEmployeesUsername };
}
