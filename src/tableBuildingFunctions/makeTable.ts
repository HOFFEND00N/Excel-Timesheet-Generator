import {
  HorizontalAlignTextWays,
  makeBoldCellTextStyle,
  makeCellBorderStyle,
  makeDefaultTextStyle,
  makeStyleHorizontalAlignText,
} from "../constants/styleConstants";
import { getStartTablePoint, getTableHeaders } from "../constants/constant";
import { makeMonthRows } from "./makeMonthRows";
import { makeTableRow } from "./makeTableRow";
import { styleTableRow } from "./styleTableRow";
import { makeEmployeeDataRows } from "./makeEmployeeDataRows";
import { TableData } from "../classes/TableData";
import { Point } from "../classes/Point";
import { addRowToTable } from "./addRowToTable";
import { CommonCell } from "./types";

type MakeTableArguments = {
  tableData: TableData;
  currentDate: Date;
  fetchUserTasks: ({
    jiraUserName,
    login,
    password,
  }: {
    jiraUserName: string;
    login: string;
    password: string;
  }) => Promise<string[]>;
  getCredentials: () => Promise<{ login: string; password: string }>;
};

export async function makeTable({
  tableData,
  currentDate,
  fetchUserTasks,
  getCredentials,
}: MakeTableArguments): Promise<CommonCell[]> {
  const table: CommonCell[] = [];
  const startTablePoint: Point = getStartTablePoint();

  const tableHeaders = getTableHeaders();
  const monthRow = makeMonthRows(currentDate);
  const { row: pointRow, column: pointColumn }: Point = startTablePoint;
  addRowToTable(monthRow, table);

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
  addRowToTable(tableHeadersRow, table);

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
    addRowToTable(row, table);
  }

  return table;
}
