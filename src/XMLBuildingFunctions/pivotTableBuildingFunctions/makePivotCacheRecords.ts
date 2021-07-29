import { create } from "xmlbuilder2";
import { START_TABLE_POINT, TABLE_HEADERS } from "../../constants/constant";
import { CommonCell } from "../../tableBuildingFunctions/types";
import { makePivotRowValue } from "./makePivotRowValue";
import { Employee } from "../../classes/Employee";

export function makePivotCacheRecords({
  table,
  employees,
}: {
  table: CommonCell[];
  employees: Employee[];
}) {
  const tableRowsCount =
    table.reduce(
      (maxRow: number, tableCell) =>
        maxRow > tableCell.point.row ? maxRow : tableCell.point.row,
      0
    ) - START_TABLE_POINT.row;

  let pivotCacheRecords = create({
    encoding: "utf-8",
    standalone: "yes",
  })
    .ele("pivotCacheRecords", {
      xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
      "xmlns:r":
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
      count: `${tableRowsCount}`,
    })
    .ele("r");

  const startTableContentIndex = table.findIndex(
    (currentTableCell) =>
      currentTableCell.point.row == START_TABLE_POINT.row + 1 &&
      currentTableCell.point.column == START_TABLE_POINT.column
  );
  let tableHeadersCount = TABLE_HEADERS.length;

  for (let i = startTableContentIndex; i < table.length; i++) {
    if (tableHeadersCount == 0) {
      pivotCacheRecords = pivotCacheRecords.up().ele("r");
      tableHeadersCount = TABLE_HEADERS.length;
    }
    const tableCell = table[i];
    pivotCacheRecords = makePivotRowValue(
      tableCell.value,
      pivotCacheRecords,
      employees
    );
    tableHeadersCount--;
  }

  return pivotCacheRecords;
}
