import { PivotCacheRecords } from "../../../XlsxFileClasses/pivotCacheRecords";
import { makePivotCacheRecords } from "../makePivotCacheRecords";
import { CommonCell } from "../../../tableBuildingFunctions/types";

test("pass table with 3 columns and 2 rows, expect to return pivot cache records with one record", () => {
  const expectedPivotCacheRecords: PivotCacheRecords = {
    "@count": "1",
    "@xmlns": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "@xmlns:r":
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    r: [
      {
        "#": [
          { n: { "@v": "1" } },
          { x: { "@v": "0" } },
          { s: { "@v": "test" } },
        ],
      },
    ],
  };
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

  const actualPivotCacheRecords = makePivotCacheRecords({
    table,
    recordElementsCount: 3,
    startTablePoint: { column: 1, row: 1 },
    employees: [{ name: "Karaseva Svetlana", jiraUsername: "KarasevaS" }],
  });

  expect(actualPivotCacheRecords).toEqual(expectedPivotCacheRecords);
});
