import { IEmployee } from "../../models/IEmployee";
import { CommonValue, HoursByEmployees } from "../types";

export function makeNonWorkingHoursByEmployeesUsername({
  employeeColumn,
  manHoursColumn,
  nonWorkingHoursRows,
  employees,
}: {
  employeeColumn: number;
  manHoursColumn: number;
  nonWorkingHoursRows: CommonValue[][];
  employees: IEmployee[];
}) {
  return nonWorkingHoursRows.reduce((nonWorkingHoursByEmployeesUsername: HoursByEmployees, nonWorkingHoursRow) => {
    const employeeName = nonWorkingHoursRow[employeeColumn].toString();
    const manHours = Number(nonWorkingHoursRow[manHoursColumn]);
    const employee = employees.find((employee) => `${employee.lastName} ${employee.firstName}` === employeeName);
    if (!employee) return nonWorkingHoursByEmployeesUsername;

    nonWorkingHoursByEmployeesUsername[employee.jiraUsername] =
      (nonWorkingHoursByEmployeesUsername[employee.jiraUsername] ?? 0) + manHours;
    return nonWorkingHoursByEmployeesUsername;
  }, {});
}
