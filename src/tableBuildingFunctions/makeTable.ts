import {
  makeBoldCellTextStyle,
  makeCellBorderStyle,
  makeDefaultTextStyle,
} from "../constants/styleConstants";
import { getTableHeaders } from "../constants/constant";
import { makeMonthRows } from "./makeMonthRows";
import { makeTableRow } from "./makeTableRow";
import { styleTableRow } from "./styleTableRow";
import { makeEmployeeDataRows } from "./makeEmployeeDataRows";
import { TableCell } from "../classes/TableCell";
import { TableData } from "../classes/TableData";
import { Point } from "../classes/Point";
import { addTableRowToTable } from "./addTableToRow";

export function makeTable(tableData: TableData, startTablePoint: Point) {
  const table: TableCell[] = [];

  const tableHeaders: string[] = getTableHeaders();
  const monthRow: TableCell[] = makeMonthRows();
  const { row: pointRow, column: pointColumn }: Point = startTablePoint;
  addTableRowToTable(monthRow, table);

  const tableHeadersRow: TableCell[] = makeTableRow({
    startPoint: new Point(pointColumn, pointRow),
    values: tableHeaders,
  });
  styleTableRow({
    row: tableHeadersRow,
    cellStyles: [
      makeBoldCellTextStyle(),
      makeCellBorderStyle(),
      makeDefaultTextStyle(),
    ],
  });
  addTableRowToTable(tableHeadersRow, table);

  const tableRowsValues: string[][] = makeEmployeeDataRows(tableData);
  for (let i = 1; i < tableRowsValues.length; i++) {
    const tableRowValues = tableRowsValues[i];
    const row: TableCell[] = makeTableRow({
      startPoint: new Point(pointColumn, pointRow + i),
      values: tableRowValues,
    });
    styleTableRow({
      row,
      cellStyles: [makeCellBorderStyle(), makeDefaultTextStyle()],
    });
    addTableRowToTable(row, table);
  }

  return table;
}
