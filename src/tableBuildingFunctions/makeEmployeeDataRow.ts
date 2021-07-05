import { CommonValue, HoursByEmployees, TableHeader } from "./types";
import { TableData } from "../classes/TableData";
import { Employee } from "../classes/Employee";

type makeEmployeeDataRowArguments = {
  tableData: TableData;
  headers: TableHeader[];
  nonWorkingHoursByEmployeesUsername: HoursByEmployees;
  workingHoursPerMonth: number;
  employee: Employee;
  userTasksByEmployeeUsername: Record<string, string[]>;
};

export function makeEmployeeDataRow({
  headers,
  userTasksByEmployeeUsername,
  workingHoursPerMonth,
  nonWorkingHoursByEmployeesUsername,
  tableData,
  employee,
}: makeEmployeeDataRowArguments) {
  return headers.map((header) => {
    if (header.label == "Employee") return employee.name;
    if (header.label == "Task")
      return userTasksByEmployeeUsername[employee.jiraUsername].join(" ");
    if (header.label == "Man-Hours")
      return (
        workingHoursPerMonth -
        (nonWorkingHoursByEmployeesUsername[employee.jiraUsername] ?? 0)
      );
    const cell: CommonValue = tableData[header.dataKey];
    return cell ?? "";
  });
}
