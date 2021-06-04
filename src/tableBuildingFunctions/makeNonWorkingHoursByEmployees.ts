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
  const nonWorkingHoursByEmployees: Map<string, number> = new Map();

  for (const nonWorkingHoursRow of nonWorkingHoursRows) {
    const key = nonWorkingHoursRow[employeeColumn].toString();
    const value = Number(nonWorkingHoursRow[manHoursColumn]);

    if (nonWorkingHoursByEmployees.has(key))
      nonWorkingHoursByEmployees.set(
        key,
        nonWorkingHoursByEmployees.get(key) + value
      );
    else nonWorkingHoursByEmployees.set(key, value);
  }
  return nonWorkingHoursByEmployees;
}
