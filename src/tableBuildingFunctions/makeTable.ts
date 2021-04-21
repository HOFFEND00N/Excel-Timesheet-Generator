import {
  makeBoldCellTextStyle,
  makeCellBorderStyle,
  makeDefaultTextStyle,
} from "../constants/styleConstants";
import { getStartTablePoint, getTableHeaders } from "../constants/constant";
import { makeMonthRows } from "./makeMonthRows";
import { makeTableRow } from "./makeTableRow";
import { styleTableRow } from "./styleTableRow";
import { makeEmployeeDataRows } from "./makeEmployeeDataRows";
import { TableCell } from "../classes/TableCell";
import { TableData } from "../classes/TableData";
import { Point } from "../classes/Point";
import { addTableRowToTable } from "./addTableToRow";

export function makeTable(tableData: TableData, startTablePoint: Point) {
  let table: TableCell[] = [];

  let tableHeaders: string[] = getTableHeaders();
  let monthRow: TableCell[] = makeMonthRows();
  let { row: pointRow, column: pointColumn }: Point = startTablePoint;
  addTableRowToTable(monthRow, table);

  let tableHeadersRow: TableCell[] = makeTableRow({
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

  pointRow++;
  const tableRowsValues: string[][] = makeEmployeeDataRows(tableData);
  for (const tableRowValues of tableRowsValues) {
    let row: TableCell[] = makeTableRow({
      startPoint: new Point(pointColumn, pointRow),
      values: tableRowValues,
    });
    styleTableRow({
      row,
      cellStyles: [makeCellBorderStyle(), makeDefaultTextStyle()],
    });
    addTableRowToTable(row, table);
    pointRow++;
  }

  return table;
}
