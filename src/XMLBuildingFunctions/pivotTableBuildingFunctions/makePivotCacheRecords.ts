import { CommonCell } from "../../tableBuildingFunctions/types";
import { IEmployee } from "../../models/IEmployee";
import { PivotCacheRecords } from "../types";
import { IPoint } from "../../models/IPoint";
import { makePivotCacheRecordsContent } from "./makePivotCacheRecordsContent";

export function makePivotCacheRecords({
  table,
  employees,
  startTablePoint,
  recordElementsCount,
}: {
  table: CommonCell[];
  employees: IEmployee[];
  startTablePoint: IPoint;
  recordElementsCount: number;
}) {
  const tableRowsCount =
    table.reduce((maxRow: number, tableCell) => (maxRow > tableCell.point.row ? maxRow : tableCell.point.row), 0) -
    startTablePoint.row;

  const startTableContentIndex = table.findIndex(
    (currentTableCell) =>
      currentTableCell.point.row === startTablePoint.row + 1 && currentTableCell.point.column === startTablePoint.column
  );

  const pivotCacheRecords: PivotCacheRecords = {
    "@xmlns": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "@xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "@count": `${tableRowsCount}`,
    r: makePivotCacheRecordsContent({
      table,
      employees,
      startTableContentIndex,
      recordElementsCount,
    }),
  };

  return pivotCacheRecords;
}
