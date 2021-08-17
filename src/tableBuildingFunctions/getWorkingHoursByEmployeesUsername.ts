import { Employee } from "../classes/Employee";
import { HoursByEmployees } from "./types";
import { getWorkingHoursPerMonth } from "./getWorkingHoursPerMonth";
import { isEmployeesHaveDifferentMonthlyRate } from "./isEmployeesHaveDifferentMonthlyRate";
import { getChosenEmployeesNames } from "./getChosenEmployeesNames";

export async function getWorkingHoursByEmployeesUsername(
  employees: Employee[]
) {
  const workingHoursPerMonth = await getWorkingHoursPerMonth();

  const workingHoursByEmployeesUsername: HoursByEmployees = {};
  for (const employee of employees) {
    workingHoursByEmployeesUsername[
      employee.jiraUsername
    ] = workingHoursPerMonth;
  }

  console.log(workingHoursByEmployeesUsername);
  let isSetupCompleted = false;

  while (!isSetupCompleted) {
    if (await isEmployeesHaveDifferentMonthlyRate()) {
      const workingHoursPerMonth = await getWorkingHoursPerMonth();

      const chosenEmployees = await getChosenEmployeesNames(employees);

      for (const chosenEmployee of chosenEmployees) {
        const employee = employees.find(
          (employee) => employee.name == chosenEmployee
        );
        if (employee != undefined)
          workingHoursByEmployeesUsername[
            employee.jiraUsername
          ] = workingHoursPerMonth;
      }
    } else isSetupCompleted = true;
    console.log(workingHoursByEmployeesUsername);
  }
  return workingHoursByEmployeesUsername;
}
