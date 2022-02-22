import { IEmployee } from "../../models/IEmployee";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEmployeeDataValid(employee?: any): employee is IEmployee {
  if (!employee) {
    console.log("employee field is missing in config");
    return false;
  }

  if (employee.workingHoursPerMonth && typeof employee.workingHoursPerMonth !== "number") {
    console.log("wrong type of workingHoursPerMonth field, must be a number");
    return false;
  }

  if (!employee.jiraUsername) {
    console.log("employee jiraUsername field is missing in config");
    return false;
  }

  if (!employee.firstName) {
    console.log("employee firstName field is missing in config");
    return false;
  }

  if (!employee.lastName) {
    console.log("employee lastName field is missing in config");
    return false;
  }

  return true;
}
