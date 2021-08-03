import { PivotCacheRecordElement } from "../../../XlsxFileClasses/pivotCacheRecords";
import { makePivotCacheRecordElement } from "../makePivotCacheRecordElement";

test("pass string, expect to return string pivot cache record element", () => {
  const expectedPivotCacheRecordElement: PivotCacheRecordElement = {
    s: { "@v": "test" },
  };

  const actualPivotCacheRecordElement = makePivotCacheRecordElement({
    value: "test",
    employees: [{ name: "Karaseva Svetlana", jiraUsername: "KarasevaS" }],
  });

  expect(actualPivotCacheRecordElement).toEqual(
    expectedPivotCacheRecordElement
  );
});

test("pass number, expect to return number pivot cache record element", () => {
  const expectedPivotCacheRecordElement: PivotCacheRecordElement = {
    n: { "@v": "1" },
  };

  const actualPivotCacheRecordElement = makePivotCacheRecordElement({
    value: 1,
    employees: [{ name: "Karaseva Svetlana", jiraUsername: "KarasevaS" }],
  });

  expect(actualPivotCacheRecordElement).toEqual(
    expectedPivotCacheRecordElement
  );
});

test("pass employee, expect to return shared item pivot cache record element", () => {
  const expectedPivotCacheRecordElement: PivotCacheRecordElement = {
    x: { "@v": "0" },
  };

  const actualPivotCacheRecordElement = makePivotCacheRecordElement({
    value: "Karaseva Svetlana",
    employees: [{ name: "Karaseva Svetlana", jiraUsername: "KarasevaS" }],
  });

  expect(actualPivotCacheRecordElement).toEqual(
    expectedPivotCacheRecordElement
  );
});
