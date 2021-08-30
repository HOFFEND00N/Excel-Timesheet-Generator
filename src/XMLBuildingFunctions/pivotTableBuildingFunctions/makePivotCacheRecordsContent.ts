import { CommonCell } from "../../tableBuildingFunctions/types";
import { IEmployee } from "../../models/IEmployee";
import { PivotCacheRecord } from "../types";
import { makePivotCacheRecordElement } from "./makePivotCacheRecordElement";

export function makePivotCacheRecordsContent({
  startTableContentIndex,
  table,
  employees,
  recordElementsCount,
}: {
  startTableContentIndex: number;
  table: CommonCell[];
  employees: IEmployee[];
  recordElementsCount: number;
}): PivotCacheRecord[] {
  let counter = recordElementsCount;
  const records: PivotCacheRecord[] = [{ "#": [] }];
  for (let i = startTableContentIndex; i < table.length; i++) {
    if (counter === 0) {
      counter = recordElementsCount;
      records.push({ "#": [] });
    }
    records[records.length - 1]["#"].push(makePivotCacheRecordElement({ value: table[i].value, employees }));
    counter--;
  }
  return records;
}
