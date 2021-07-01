import { CommonValue, HoursByEmployees } from "./types";
import { TableData } from "../classes/TableData";

export function makeNonWorkingHoursByEmployeesUserName({
  employeeColumn,
  manHoursColumn,
  nonWorkingHoursRows,
  tableData,
}: {
  employeeColumn: number;
  manHoursColumn: number;
  nonWorkingHoursRows: CommonValue[][];
  tableData: TableData;
}) {
  return nonWorkingHoursRows.reduce(
    (
      nonWorkingHoursByEmployeesUsername: HoursByEmployees,
      nonWorkingHoursRow
    ) => {
      const employeeName = nonWorkingHoursRow[employeeColumn].toString();
      const manHours = Number(nonWorkingHoursRow[manHoursColumn]);
      const employee =
        tableData.employees.find((employee) => employee.name == employeeName) ??
        tableData.teamLead;

      nonWorkingHoursByEmployeesUsername[employee.jiraUsername] =
        (nonWorkingHoursByEmployeesUsername[employee.jiraUsername] ?? 0) +
        manHours;
      return nonWorkingHoursByEmployeesUsername;
    },
    {}
  );
}
