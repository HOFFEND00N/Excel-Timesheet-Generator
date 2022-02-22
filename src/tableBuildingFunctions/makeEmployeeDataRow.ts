import { IEmployee } from "../models/IEmployee";
import { CommonValue, HoursByEmployees, TableHeader } from "./types";
import { ITeamConfig } from "../models/ITeamConfig";

type makeEmployeeDataRowArguments = {
  config: ITeamConfig;
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
  config,
  employee,
}: makeEmployeeDataRowArguments) {
  return headers.map((header) => {
    if (header.label === "Employee") return `${employee.lastName} ${employee.firstName}`;
    if (header.label === "Task") return userTasksByEmployeeUsername[employee.jiraUsername].join(" ");
    if (header.label === "Man-Hours")
      return workingHoursPerMonth - (nonWorkingHoursByEmployeesUsername[employee.jiraUsername] ?? 0);
    const cell: CommonValue = config[header.dataKey];
    return cell ?? "";
  });
}
