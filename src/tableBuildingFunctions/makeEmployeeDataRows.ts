import { ITableData } from "../models/ITableData";
import { CommonValue, HoursByEmployees, TableHeader } from "./types";

import { makeEmployeeDataRow } from "./makeEmployeeDataRow";

type MakeEmployeeDataRowsArguments = {
  tableData: ITableData;
  headers: TableHeader[];
  nonWorkingHoursByEmployeesUsername: HoursByEmployees;
  workingHoursByEmployeesUsername: HoursByEmployees;
  userTasksByEmployeeUsername: Record<string, string[]>;
};

export async function makeEmployeeDataRows({
  tableData,
  headers,
  nonWorkingHoursByEmployeesUsername,
  workingHoursByEmployeesUsername,
  userTasksByEmployeeUsername,
}: MakeEmployeeDataRowsArguments): Promise<CommonValue[][]> {
  const employeeDataRows: CommonValue[][] = [];

  for (const employee of tableData.employees) {
    employeeDataRows.push(
      makeEmployeeDataRow({
        headers,
        userTasksByEmployeeUsername,
        workingHoursPerMonth: workingHoursByEmployeesUsername[employee.jiraUsername],
        nonWorkingHoursByEmployeesUsername,
        tableData,
        employee,
      })
    );
  }

  employeeDataRows.push(
    makeEmployeeDataRow({
      headers,
      userTasksByEmployeeUsername,
      workingHoursPerMonth: workingHoursByEmployeesUsername[tableData.teamLead.jiraUsername],
      nonWorkingHoursByEmployeesUsername,
      tableData,
      employee: tableData.teamLead,
    })
  );

  return employeeDataRows;
}
