import {
  HorizontalAlignTextWays,
  makeBoldCellTextStyle,
  makeCellBorderStyle,
  makeDefaultTextStyle,
  makeStyleHorizontalAlignText,
} from "../constants/styleConstants";
import { START_TABLE_POINT, TABLE_HEADERS } from "../constants/constant";
import { TableData } from "../classes/TableData";
import { Point } from "../classes/Point";
import { makeMonthRows } from "./makeMonthRows";
import { makeTableRow } from "./makeTableRow";
import { styleTableRow } from "./styleTableRow";
import { makeEmployeeDataRows } from "./makeEmployeeDataRows";
import { CommonCell, UserData } from "./types";
import { getNonWorkingHoursRows, makeNonWorkingHoursByEmployeesUsername } from "./nonWorkingHoursHelpers";
import { errorHandler } from "./errorHandler";

type MakeTableArguments = {
  tableData: TableData;
  currentDate: Date;
  userData: UserData;
};

export async function makeTable({ tableData, currentDate, userData }: MakeTableArguments): Promise<CommonCell[]> {
  const table: CommonCell[] = [];
  const startTablePoint: Point = START_TABLE_POINT;

  const tableHeaders = TABLE_HEADERS;
  const monthRow = makeMonthRows(currentDate);
  const { row: pointRow, column: pointColumn }: Point = startTablePoint;
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

  const nonWorkingHoursRows = await getNonWorkingHoursRows(tableData, userData.nonWorkingHoursFile);

  const employeeColumn = tableHeaders.findIndex((item) => item.label === "Employee");
  const manHoursColumn = tableHeaders.findIndex((item) => item.label === "Man-Hours");

  const nonWorkingHoursByEmployeesUsername = makeNonWorkingHoursByEmployeesUsername({
    employeeColumn,
    manHoursColumn,
    nonWorkingHoursRows,
    employees: [...tableData.employees, tableData.teamLead],
  });

  const tableRowsValues = await errorHandler(makeEmployeeDataRows, {
    tableData,
    headers: tableHeaders,
    nonWorkingHoursByEmployeesUsername,
    workingHoursByEmployeesUsername: userData.workingHoursByEmployeesUsername,
    userTasksByEmployeeUsername: userData.userTasksByEmployeeUsername,
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
