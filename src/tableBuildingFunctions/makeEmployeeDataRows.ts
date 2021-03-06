import { CommonValue, HoursByEmployees, TableHeader } from "./types";
import { makeEmployeeDataRow } from "./makeEmployeeDataRow";
import { ITeamConfig } from "../models/ITeamConfig";

type MakeEmployeeDataRowsArguments = {
  config: ITeamConfig;
  headers: TableHeader[];
  nonWorkingHoursByEmployeesUsername: HoursByEmployees;
  workingHoursByEmployeesUsername: HoursByEmployees;
  userTasksByEmployeeUsername: Record<string, string[]>;
};

export async function makeEmployeeDataRows({
  config,
  headers,
  nonWorkingHoursByEmployeesUsername,
  workingHoursByEmployeesUsername,
  userTasksByEmployeeUsername,
}: MakeEmployeeDataRowsArguments): Promise<CommonValue[][]> {
  const employeeDataRows: CommonValue[][] = [];

  for (const employee of config.employees) {
    employeeDataRows.push(
      makeEmployeeDataRow({
        headers,
        userTasksByEmployeeUsername,
        workingHoursPerMonth: workingHoursByEmployeesUsername[employee.jiraUsername],
        nonWorkingHoursByEmployeesUsername,
        config,
        employee,
      })
    );
  }

  employeeDataRows.push(
    makeEmployeeDataRow({
      headers,
      userTasksByEmployeeUsername,
      workingHoursPerMonth: workingHoursByEmployeesUsername[config.teamLead.jiraUsername],
      nonWorkingHoursByEmployeesUsername,
      config,
      employee: config.teamLead,
    })
  );

  return employeeDataRows;
}
