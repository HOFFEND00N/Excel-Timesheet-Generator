import { Employee } from "../classes/Employee";
import { HoursByEmployees } from "./types";

export async function getWorkingHoursByEmployeesUsername({
  employees,
  getWorkingHoursPerMonth,
  shouldUpdateEmployeeMonthRate,
  getChosenEmployeesNames,
}: {
  employees: Employee[];
  getWorkingHoursPerMonth: () => Promise<number>;
  shouldUpdateEmployeeMonthRate: () => Promise<boolean>;
  getChosenEmployeesNames: (employee: Employee[]) => Promise<string>;
}) {
  const workingHoursPerMonth = await getWorkingHoursPerMonth();

  const workingHoursByEmployeesUsername: HoursByEmployees = {};
  for (const employee of employees) {
    workingHoursByEmployeesUsername[employee.jiraUsername] = workingHoursPerMonth;
  }

  while (await shouldUpdateEmployeeMonthRate()) {
    const chosenEmployees = await getChosenEmployeesNames(employees);
    const workingHoursPerMonth = await getWorkingHoursPerMonth();

    for (const chosenEmployee of chosenEmployees) {
      const employee = employees.find((employee) => employee.name == chosenEmployee);
      if (employee != undefined) workingHoursByEmployeesUsername[employee.jiraUsername] = workingHoursPerMonth;
    }

    console.log(workingHoursByEmployeesUsername);
  }
  return workingHoursByEmployeesUsername;
}
