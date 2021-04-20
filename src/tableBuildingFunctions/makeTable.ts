import {
  makeBoldCellTextStyle,
  makeCellBorderStyle,
  makeDefaultTextStyle,
} from "../constants/styleConstants";
import { getStartTablePoint, getTableHeaders } from "../constants/constant";
import { makeMonthRows } from "./makeMonthRows";
import { makeTableRow } from "./makeTableRow";
import { styleTableRow } from "./styleTableRow";
import { makeTableRowsValues } from "./makeTableRowsValues";
import { TableCell } from "../classes/TableCell";
import { TableData } from "../classes/TableData";
import { Point } from "../classes/Point";
import { addTableRowToTable } from "./addTableToRow";

export function makeTable(tableData: TableData, startTablePoint: Point) {
  let table: TableCell[] = [];

  let tableHeaders: string[] = getTableHeaders();
  let monthRow: TableCell[] = makeMonthRows();
  addTableRowToTable(monthRow, table);

  let tableHeadersRow: TableCell[] = makeTableRow({
    startPoint: startTablePoint,
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

  startTablePoint.row++;
  const tableRowsValues: string[][] = makeTableRowsValues(tableData);
  for (const tableRowValues of tableRowsValues) {
    let row: TableCell[] = makeTableRow({
      startPoint: startTablePoint,
      values: tableRowValues,
    });
    styleTableRow({
      row,
      cellStyles: [makeCellBorderStyle(), makeDefaultTextStyle()],
    });
    addTableRowToTable(row, table);
    startTablePoint.row++;
  }

  return table;
}
