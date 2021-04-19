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
  let table: Array<TableCell> = [];

  let tableHeaders: Array<string> = getTableHeaders();
  let monthRow: Array<TableCell> = makeMonthRows();
  addTableRowToTable(monthRow, table);

  let tableHeadersRow: Array<TableCell> = makeTableRow({
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
  const tableRowsValues: Array<Array<string>> = makeTableRowsValues(tableData);
  for (const tableRowValues of tableRowsValues) {
    let row: Array<TableCell> = makeTableRow({
      startPoint: startTablePoint,
      values: tableRowValues,
    });
    styleTableRow({
      row,
      cellStyles: [makeDefaultTextStyle(), makeCellBorderStyle()],
    });
    addTableRowToTable(row, table);
    startTablePoint.row++;
  }

  return table;
}
