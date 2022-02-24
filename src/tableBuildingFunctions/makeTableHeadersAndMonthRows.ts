import { CommonCell } from "./types";
import { IPoint } from "../models/IPoint";
import { START_TABLE_POINT, TABLE_HEADERS } from "../constants/constant";
import { makeMonthRows } from "./makeMonthRows";
import { makeTableRow } from "./makeTableRow";
import { styleTableRow } from "./styleTableRow";
import { makeBoldCellTextStyle, makeCellBorderStyle, makeDefaultTextStyle } from "../constants/styleConstants";

export function makeTableHeadersAndMonthRows(currentDate: Date) {
  const table: CommonCell[] = [];

  const monthRow = makeMonthRows(currentDate);
  const { row: pointRow, column: pointColumn }: IPoint = START_TABLE_POINT;
  table.push(...monthRow);

  const tableHeadersRow = makeTableRow({
    startPoint: { column: pointColumn, row: pointRow },
    values: TABLE_HEADERS.map((item) => item.label),
  });
  styleTableRow({
    row: tableHeadersRow,
    cellStyles: [makeBoldCellTextStyle(), makeCellBorderStyle(), makeDefaultTextStyle()],
  });
  table.push(...tableHeadersRow);

  return table;
}
