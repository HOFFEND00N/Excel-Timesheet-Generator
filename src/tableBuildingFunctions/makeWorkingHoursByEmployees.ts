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
  return employeesNames.reduce(
    (workingHoursByEmployees: HoursByEmployees, employeeName) => {
      let nonWorkingEmployeeHours = nonWorkingHoursByEmployees[employeeName];
      if (nonWorkingEmployeeHours == undefined) nonWorkingEmployeeHours = 0;

      workingHoursByEmployees[employeeName] =
        workingHoursPerMonth - nonWorkingEmployeeHours;
      return workingHoursByEmployees;
    },
    {}
  );
}
