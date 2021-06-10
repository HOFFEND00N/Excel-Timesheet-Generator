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
      const key = nonWorkingHoursRow[employeeColumn].toString();
      const value = Number(nonWorkingHoursRow[manHoursColumn]);

      if (nonWorkingHoursByEmployees[key] !== undefined)
        nonWorkingHoursByEmployees[key] =
          nonWorkingHoursByEmployees[key] + value;
      else nonWorkingHoursByEmployees[key] = value;
      return nonWorkingHoursByEmployees;
    },
    {}
  );
}
