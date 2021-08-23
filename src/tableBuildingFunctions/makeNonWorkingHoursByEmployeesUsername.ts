import { CommonValue, HoursByEmployees } from "./types";
import { Employee } from "../classes/Employee";

export function makeNonWorkingHoursByEmployeesUsername({
  employeeColumn,
  manHoursColumn,
  nonWorkingHoursRows,
  employees,
}: {
  employeeColumn: number;
  manHoursColumn: number;
  nonWorkingHoursRows: CommonValue[][];
  employees: Employee[];
}) {
  return nonWorkingHoursRows.reduce((nonWorkingHoursByEmployeesUsername: HoursByEmployees, nonWorkingHoursRow) => {
    const employeeName = nonWorkingHoursRow[employeeColumn].toString();
    const manHours = Number(nonWorkingHoursRow[manHoursColumn]);
    const employee = employees.find((employee) => employee.name == employeeName);
    if (!employee) return nonWorkingHoursByEmployeesUsername;

    nonWorkingHoursByEmployeesUsername[employee.jiraUsername] =
      (nonWorkingHoursByEmployeesUsername[employee.jiraUsername] ?? 0) + manHours;
    return nonWorkingHoursByEmployeesUsername;
  }, {});
}
