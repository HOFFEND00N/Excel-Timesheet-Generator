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
  getChosenEmployeesNames: (employee: Employee[]) => Promise<Employee[]>;
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
      workingHoursByEmployeesUsername[chosenEmployee.jiraUsername] = workingHoursPerMonth;
    }

    console.log(workingHoursByEmployeesUsername);
  }
  return workingHoursByEmployeesUsername;
}
