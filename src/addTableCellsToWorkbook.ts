/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonCell, isNumericCell, isStringCell } from "./tableBuildingFunctions/types";

export function addTableCellsToWorkbook({
  table,
  workSheet,
  workBook,
  taskColumn,
}: {
  table: CommonCell[];
  workSheet: any;
  workBook: any;
  taskColumn: number;
}) {
  for (const tableCell of table) {
    const cell = workSheet.cell(tableCell.point.row, tableCell.point.column);
    if (isNumericCell(tableCell)) cell.number(tableCell.value);
    if (isStringCell(tableCell)) cell.string(tableCell.value);

    if (tableCell.point.column === taskColumn)
      cell.style(
        workBook.createStyle({
          alignment: {
            wrapText: true,
          },
        })
      );

    for (const style of tableCell.styles) {
      cell.style(workBook.createStyle(style));
    }
  }
}
