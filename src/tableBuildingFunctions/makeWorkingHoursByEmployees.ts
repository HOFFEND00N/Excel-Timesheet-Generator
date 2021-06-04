export function makeWorkingHoursByEmployees({
  nonWorkingHoursByEmployees,
  workingHoursPerMonth,
  employeesNames,
}: {
  nonWorkingHoursByEmployees: Map<string, number>;
  workingHoursPerMonth: number;
  employeesNames: string[];
}) {
  const workingHoursByEmployees: Map<string, number> = new Map();
  for (const employeeName of employeesNames) {
    let nonWorkingEmployeeHours = nonWorkingHoursByEmployees.get(employeeName);
    if (nonWorkingEmployeeHours == undefined) nonWorkingEmployeeHours = 0;

    workingHoursByEmployees.set(
      employeeName,
      workingHoursPerMonth - nonWorkingEmployeeHours
    );
  }
  return workingHoursByEmployees;
}
