import {
  HorizontalAlignTextWays,
  makeBoldCellTextStyle,
  makeCellBorderStyle,
  makeDefaultTextStyle,
  makeStyleHorizontalAlignText,
} from "../constants/styleConstants";
import { START_TABLE_POINT, TABLE_HEADERS } from "../constants/constant";
import { makeMonthRows } from "./makeMonthRows";
import { makeTableRow } from "./makeTableRow";
import { styleTableRow } from "./styleTableRow";
import { makeEmployeeDataRows } from "./makeEmployeeDataRows";
import { TableData } from "../classes/TableData";
import { Point } from "../classes/Point";
import { CommonCell, FetchUserTasksArguments } from "./types";

type MakeTableArguments = {
  tableData: TableData;
  currentDate: Date;
  fetchUserTasks: ({
    jiraUserName,
    login,
    password,
  }: FetchUserTasksArguments) => Promise<string[]>;
  getCredentials: () => Promise<{ login: string; password: string }>;
  getNonWorkingHoursRows: (tableData: TableData) => Promise<string[][]>;
};

export async function makeTable({
  tableData,
  currentDate,
  fetchUserTasks,
  getCredentials,
  getNonWorkingHoursRows,
}: MakeTableArguments): Promise<CommonCell[]> {
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
    cellStyles: [
      makeBoldCellTextStyle(),
      makeCellBorderStyle(),
      makeDefaultTextStyle(),
    ],
  });
  table.push(...tableHeadersRow);

  const tableRowsValues = await makeEmployeeDataRows({
    tableData,
    headers: tableHeaders,
    fetchUserTasks,
    getCredentials,
  });
  for (let i = 0; i < tableRowsValues.length; i++) {
    const tableRowValues = tableRowsValues[i];
    const row = makeTableRow({
      startPoint: { column: pointColumn, row: pointRow + i + 1 },
      values: tableRowValues,
    });
    styleTableRow({
      row: [row[0], row[1]],
      cellStyles: [
        makeStyleHorizontalAlignText(HorizontalAlignTextWays.center),
      ],
    });
    styleTableRow({
      row,
      cellStyles: [makeCellBorderStyle(), makeDefaultTextStyle()],
    });
    table.push(...row);
  }

  const result = await getNonWorkingHoursRows(tableData);

  const startPoint: Point = {
    column: startTablePoint.column,
    row: startTablePoint.row + tableRowsValues.length,
  };
  for (let i = 0; i < result.length; i++) {
    const row = makeTableRow({
      startPoint: { column: startPoint.column, row: startPoint.row + i + 1 },
      values: result[i],
    });
    styleTableRow({
      row: [row[0], row[1]],
      cellStyles: [
        makeStyleHorizontalAlignText(HorizontalAlignTextWays.center),
      ],
    });
    styleTableRow({
      row,
      cellStyles: [makeCellBorderStyle(), makeDefaultTextStyle()],
    });
    table.push(...row);
  }

  return table;
}
