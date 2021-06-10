import { HoursByEmployees } from "./types";

export function makeWorkingHoursByEmployees({
  nonWorkingHoursByEmployees,
  workingHoursPerMonth,
  employeesNames,
}: {
  nonWorkingHoursByEmployees: HoursByEmployees;
  workingHoursPerMonth: number;
  employeesNames: string[];
}) {
  const workingHoursByEmployees: HoursByEmployees = {};
  for (const employeeName of employeesNames) {
    let nonWorkingEmployeeHours = nonWorkingHoursByEmployees[employeeName];
    if (nonWorkingEmployeeHours == undefined) nonWorkingEmployeeHours = 0;

    workingHoursByEmployees[employeeName] =
      workingHoursPerMonth - nonWorkingEmployeeHours;
  }
  return workingHoursByEmployees;
}
