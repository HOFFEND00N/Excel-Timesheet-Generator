import { getCredentials } from "./getCredentials";
import { areJiraCredentialsCorrect } from "./areJiraCredentialsCorrect";
import { getWorkingHoursByEmployeesUsername } from "./getWorkingHoursByEmployeesUsername";
import { TableData } from "../classes/TableData";
import { getWorkingHoursPerMonth } from "./getWorkingHoursPerMonth";
import { shouldUpdateEmployeeMonthRate } from "./shouldUpdateEmployeeMonthRate";
import { chooseEmployees } from "./chooseEmployees";
import { getNonWorkingHoursFile } from "./getNonWorkingHoursFile";
import { UserData } from "../tableBuildingFunctions/types";
import { getUserTasks } from "./getUserTasks";
import { fetchJiraUserTasks } from "./fetchJiraUserTasks";

export async function getUserData(tableData: TableData): Promise<UserData> {
  const workingHoursByEmployeesUsername = await getWorkingHoursByEmployeesUsername({
    employees: [...tableData.employees, tableData.teamLead],
    getWorkingHoursPerMonth,
    shouldUpdateEmployeeMonthRate,
    getChosenEmployeesNames: chooseEmployees,
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
  const tasks = await getUserTasks({ tableData, login, password, fetchUserTasks: fetchJiraUserTasks });

  return { userTasksByEmployeeUsername: tasks, nonWorkingHoursFile, workingHoursByEmployeesUsername };
}
