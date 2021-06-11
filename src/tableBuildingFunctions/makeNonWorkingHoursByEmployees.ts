import { CommonValue, HoursByEmployees } from "./types";

export function makeNonWorkingHoursByEmployees({
  employeeColumn,
  manHoursColumn,
  nonWorkingHoursRows,
}: {
  employeeColumn: number;
  manHoursColumn: number;
  nonWorkingHoursRows: CommonValue[][];
}) {
  return nonWorkingHoursRows.reduce(
    (nonWorkingHoursByEmployees: HoursByEmployees, nonWorkingHoursRow) => {
      const employee = nonWorkingHoursRow[employeeColumn].toString();
      const manHours = Number(nonWorkingHoursRow[manHoursColumn]);

      nonWorkingHoursByEmployees[employee] =
        (nonWorkingHoursByEmployees[employee] ?? 0) + manHours;
      return nonWorkingHoursByEmployees;
    },
    {}
  );
}
