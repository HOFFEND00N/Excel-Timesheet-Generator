import {
  HorizontalAlignTextWays,
  makeCellBorderStyle,
  makeDefaultTextStyle,
  makeNumberFormat,
  makeStyleHorizontalAlignText,
} from "../constants/styleConstants";
import { START_TABLE_POINT, TABLE_HEADERS } from "../constants/constant";
import { makeTableRow } from "./makeTableRow";
import { styleTableRow } from "./styleTableRow";
import { makeEmployeeDataRows } from "./makeEmployeeDataRows";
import { CommonCell, CommonValue, HoursByEmployees } from "./types";
import { makeNonWorkingHoursByEmployeesUsername } from "./nonWorkingHoursHelpers";
import { ITeamConfig } from "../models/ITeamConfig";

type MakeTableArguments = {
  config: ITeamConfig;
  userTasksByEmployeeUsername: Record<string, string[]>;
  workingHoursByEmployeesUsername: HoursByEmployees;
  nonWorkingHoursRows: CommonValue[][];
  startRow: number;
};

export async function makeTable({
  config,
  userTasksByEmployeeUsername,
  workingHoursByEmployeesUsername,
  nonWorkingHoursRows,
  startRow,
}: MakeTableArguments): Promise<CommonCell[]> {
  const table: CommonCell[] = [];

  const tableHeaders = TABLE_HEADERS;

  const employeeColumn = tableHeaders.findIndex((item) => item.label === "Employee");
  const manHoursColumn = tableHeaders.findIndex((item) => item.label === "Man-Hours");

  const nonWorkingHoursByEmployeesUsername = makeNonWorkingHoursByEmployeesUsername({
    employeeColumn,
    manHoursColumn,
    nonWorkingHoursRows,
    employees: [...config.employees, config.teamLead],
  });

  const tableRowsValues = await makeEmployeeDataRows({
    config,
    headers: tableHeaders,
    nonWorkingHoursByEmployeesUsername,
    workingHoursByEmployeesUsername,
    userTasksByEmployeeUsername,
  });

  tableRowsValues.push(...nonWorkingHoursRows);

  for (let i = 0; i < tableRowsValues.length; i++) {
    const tableRowValues = tableRowsValues[i];
    const row = makeTableRow({
      startPoint: { column: START_TABLE_POINT.column, row: startRow + i },
      values: tableRowValues,
    });
    row[tableRowValues.length - 1].styles.push(makeNumberFormat("0.00"));
    styleTableRow({
      row: [row[0], row[1]],
      cellStyles: [makeStyleHorizontalAlignText(HorizontalAlignTextWays.center)],
    });
    styleTableRow({
      row,
      cellStyles: [makeCellBorderStyle(), makeDefaultTextStyle()],
    });
    table.push(...row);
  }

  return table;
}
