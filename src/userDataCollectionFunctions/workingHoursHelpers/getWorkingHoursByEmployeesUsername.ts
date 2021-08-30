import { IEmployee } from "../../models/IEmployee";
import { HoursByEmployees } from "../../tableBuildingFunctions/types";

export async function getWorkingHoursByEmployeesUsername({
  employees,
  getWorkingHoursPerMonth,
  shouldUpdateEmployeeMonthRate,
  chooseEmployees,
}: {
  employees: IEmployee[];
  getWorkingHoursPerMonth: () => Promise<number>;
  shouldUpdateEmployeeMonthRate: () => Promise<boolean>;
  chooseEmployees: (employee: IEmployee[]) => Promise<IEmployee[]>;
}) {
  const workingHoursPerMonth = await getWorkingHoursPerMonth();

  const workingHoursByEmployeesUsername: HoursByEmployees = {};
  for (const employee of employees) {
    workingHoursByEmployeesUsername[employee.jiraUsername] = workingHoursPerMonth;
  }

  while (await shouldUpdateEmployeeMonthRate()) {
    const chosenEmployees = await chooseEmployees(employees);
    const workingHoursPerMonth = await getWorkingHoursPerMonth();

    for (const chosenEmployee of chosenEmployees) {
      workingHoursByEmployeesUsername[chosenEmployee.jiraUsername] = workingHoursPerMonth;
    }

    console.log(workingHoursByEmployeesUsername);
  }
  return workingHoursByEmployeesUsername;
}
