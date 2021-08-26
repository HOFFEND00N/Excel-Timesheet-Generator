import { PivotCacheRecord } from "../../types";
import { makePivotCacheRecordsContent } from "../makePivotCacheRecordsContent";
import { CommonCell } from "../../../tableBuildingFunctions/types";

test("pass table with 1 row expect to return one cache record", () => {
  const expectedPivotCacheRecordsContent: PivotCacheRecord[] = [
    {
      "#": [{ n: { "@v": "1" } }, { x: { "@v": "0" } }, { s: { "@v": "test" } }],
    },
  ];
  const table: CommonCell[] = [
    { point: { column: 1, row: 1 }, value: "header 1", styles: [] },
    { point: { column: 2, row: 1 }, value: "header 2", styles: [] },
    { point: { column: 3, row: 1 }, value: "header 3", styles: [] },
    { point: { column: 1, row: 2 }, value: 1, styles: [] },
    { point: { column: 2, row: 2 }, value: "Karaseva Svetlana", styles: [] },
    {
      point: {
        column: 3,
        row: 2,
      },
      value: "test",
      styles: [],
    },
  ];

  const actualPivotCacheRecordsContent = makePivotCacheRecordsContent({
    startTableContentIndex: 3,
    employees: [{ name: "Karaseva Svetlana", jiraUsername: "KarasevaS" }],
    table,
    recordElementsCount: 3,
  });

  expect(actualPivotCacheRecordsContent).toEqual(expectedPivotCacheRecordsContent);
});
