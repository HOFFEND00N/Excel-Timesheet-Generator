import { IEmployee } from "../../models/IEmployee";

export function isEmployeeDataValid(employee?: IEmployee) {
  if (!employee) {
    console.log("employee field is missing/wrong in config");
    return false;
  }

  if (!employee.jiraUsername) {
    console.log("employee jiraUsername field is missing/wrong in config");
    return false;
  }

  if (!employee.name) {
    console.log("employee name field is missing/wrong in config");
    return false;
  }

  return true;
}
