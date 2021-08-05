import { CommonCell } from "../../tableBuildingFunctions/types";
import { Employee } from "../../classes/Employee";
import { PivotCacheRecord } from "../../XlsxFileClasses";
import { TABLE_HEADERS } from "../../constants/constant";
import { makePivotCacheRecordElement } from "./makePivotCacheRecordElement";

export function makePivotCacheRecordsContent({
  startTableContentIndex,
  table,
  employees,
  recordElementsCount,
}: {
  startTableContentIndex: number;
  table: CommonCell[];
  employees: Employee[];
  recordElementsCount: number;
}): PivotCacheRecord[] {
  const records: PivotCacheRecord[] = [{ "#": [] }];
  for (let i = startTableContentIndex; i < table.length; i++) {
    if (recordElementsCount == 0) {
      recordElementsCount = TABLE_HEADERS.length;
      records.push({ "#": [] });
    }
    records[records.length - 1]["#"].push(
      makePivotCacheRecordElement({ value: table[i].value, employees })
    );
    recordElementsCount--;
  }
  return records;
}
