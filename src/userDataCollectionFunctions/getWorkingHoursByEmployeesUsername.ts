import { HoursByEmployees } from "../tableBuildingFunctions/types";
import { IEmployee } from "../models/IEmployee";

export function getWorkingHoursByEmployeesUsername({
  workingHoursPerMonth,
  team,
}: {
  workingHoursPerMonth: number;
  team: IEmployee[];
}) {
  const workingHoursByEmployeesUsername: HoursByEmployees = {};
  for (const employee of team) {
    workingHoursByEmployeesUsername[employee.jiraUsername] = employee.workingHoursPerMonth ?? workingHoursPerMonth;
  }

  return workingHoursByEmployeesUsername;
}
