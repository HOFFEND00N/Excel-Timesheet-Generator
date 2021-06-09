import { CommonValue } from "./types";

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
    (nonWorkingHoursByEmployees, nonWorkingHoursRow) => {
      const key = nonWorkingHoursRow[employeeColumn].toString();
      const value = Number(nonWorkingHoursRow[manHoursColumn]);

      if (nonWorkingHoursByEmployees.has(key))
        nonWorkingHoursByEmployees.set(
          key,
          nonWorkingHoursByEmployees.get(key) + value
        );
      else nonWorkingHoursByEmployees.set(key, value);
      return nonWorkingHoursByEmployees;
    },
    new Map<string, number>()
  );
}
