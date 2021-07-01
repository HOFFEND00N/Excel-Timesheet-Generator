import { CommonValue, HoursByEmployees, TableHeader } from "./types";
import { TableData } from "../classes/TableData";
import { Employee } from "../classes/Employee";

type makeEmployeeDataRowArguments = {
  tableData: TableData;
  headers: TableHeader[];
  nonWorkingHoursByEmployees: HoursByEmployees;
  workingHoursPerMonth: number;
  employee: Employee;
  userTasksByEmployeeUsername: Record<string, string>;
};

export function makeEmployeeDataRow({
  headers,
  userTasksByEmployeeUsername,
  workingHoursPerMonth,
  nonWorkingHoursByEmployees,
  tableData,
  employee,
}: makeEmployeeDataRowArguments) {
  return headers.map((header) => {
    if (header.label == "Employee") return employee.name;
    if (header.label == "Task")
      return userTasksByEmployeeUsername[employee.jiraUsername];
    if (header.label == "Man-Hours")
      return (
        workingHoursPerMonth - (nonWorkingHoursByEmployees[employee.name] ?? 0)
      );
    const cell: CommonValue = tableData[header.dataKey];
    return cell ?? "";
  });
}
