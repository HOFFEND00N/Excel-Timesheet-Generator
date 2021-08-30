import { ITableData } from "../models/ITableData";
import { IEmployee } from "../models/IEmployee";
import { CommonValue, HoursByEmployees, TableHeader } from "./types";

type makeEmployeeDataRowArguments = {
  tableData: ITableData;
  headers: TableHeader[];
  nonWorkingHoursByEmployeesUsername: HoursByEmployees;
  workingHoursPerMonth: number;
  employee: IEmployee;
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
    if (header.label === "Employee") return employee.name;
    if (header.label === "Task") return userTasksByEmployeeUsername[employee.jiraUsername].join(" ");
    if (header.label === "Man-Hours")
      return workingHoursPerMonth - (nonWorkingHoursByEmployeesUsername[employee.jiraUsername] ?? 0);
    const cell: CommonValue = tableData[header.dataKey];
    return cell ?? "";
  });
}
