import { create } from "xmlbuilder2";
import { TABLE_HEADERS } from "../../constants/constant";
import { CommonCell } from "../../tableBuildingFunctions/types";
import { makePivotRowValue } from "./makePivotRowValue";
import { Employee } from "../../classes/Employee";

export function makePivotCacheRecords(
  table: CommonCell[],
  employees: Employee[]
) {
  let pivotCacheRecords = create({
    encoding: "utf-8",
    standalone: "yes",
  })
    .ele("pivotCacheRecords", {
      xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
      "xmlns:r":
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
      count: "14",
    })
    .ele("r");

  let tableHeadersCount = TABLE_HEADERS.length;
  for (let i = 11; i < table.length; i++) {
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
