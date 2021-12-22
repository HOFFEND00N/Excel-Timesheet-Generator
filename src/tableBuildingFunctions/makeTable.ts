import {
  HorizontalAlignTextWays,
  makeBoldCellTextStyle,
  makeCellBorderStyle,
  makeDefaultTextStyle,
  makeStyleHorizontalAlignText,
} from "../constants/styleConstants";
import { START_TABLE_POINT, TABLE_HEADERS } from "../constants/constant";
import { IPoint } from "../models/IPoint";
import { makeMonthRows } from "./makeMonthRows";
import { makeTableRow } from "./makeTableRow";
import { styleTableRow } from "./styleTableRow";
import { makeEmployeeDataRows } from "./makeEmployeeDataRows";
import { CommonCell, HoursByEmployees } from "./types";
import { getNonWorkingHoursRows, makeNonWorkingHoursByEmployeesUsername } from "./nonWorkingHoursHelpers";
import { ITeamConfig } from "../models/ITeamConfig";

type MakeTableArguments = {
  config: ITeamConfig;
  currentDate: Date;
  userTasksByEmployeeUsername: Record<string, string[]>;
  nonWorkingHoursFile: string[][];
  workingHoursByEmployeesUsername: HoursByEmployees;
};

export async function makeTable({
  config,
  currentDate,
  userTasksByEmployeeUsername,
  nonWorkingHoursFile,
  workingHoursByEmployeesUsername,
}: MakeTableArguments): Promise<CommonCell[]> {
  const table: CommonCell[] = [];
  const startTablePoint: IPoint = START_TABLE_POINT;

  const tableHeaders = TABLE_HEADERS;
  const monthRow = makeMonthRows(currentDate);
  const { row: pointRow, column: pointColumn }: IPoint = startTablePoint;
  table.push(...monthRow);

  const tableHeadersRow = makeTableRow({
    startPoint: { column: pointColumn, row: pointRow },
    values: tableHeaders.map((item) => item.label),
  });
  styleTableRow({
    row: tableHeadersRow,
    cellStyles: [makeBoldCellTextStyle(), makeCellBorderStyle(), makeDefaultTextStyle()],
  });
  table.push(...tableHeadersRow);

  const nonWorkingHoursRows = await getNonWorkingHoursRows(config, nonWorkingHoursFile);

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
      startPoint: { column: pointColumn, row: pointRow + i + 1 },
      values: tableRowValues,
    });
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
