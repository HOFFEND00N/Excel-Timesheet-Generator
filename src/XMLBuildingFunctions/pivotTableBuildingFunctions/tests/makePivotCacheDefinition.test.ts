import { PivotCacheDefinition } from "../../types";
import { makePivotCacheDefinition } from "../makePivotCacheDefinition";

test("pass one employee, expect to return pivot cache definition with one employee", () => {
  const expectedPivotCacheDefinition: PivotCacheDefinition = {
    "@xmlns": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "@xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "@r:id": "rId1",
    cacheSource: {
      "@type": "worksheet",
      worksheetSource: {
        "@ref": "B8:C9",
        "@sheet": "Monthly timesheet",
      },
    },
    cacheFields: {
      "@count": 8,
      cacheField: [
        { "@name": "Unit", "@numFmtId": "0", sharedItems: {} },
        { "@name": "Interco", "@numFmtId": "0", sharedItems: {} },
        { "@name": "Product", "@numFmtId": "0", sharedItems: {} },
        { "@name": "Project", "@numFmtId": "0", sharedItems: {} },
        {
          "@name": "Employee",
          "@numFmtId": "0",
          sharedItems: { "@count": 1, s: [{ "@v": "Karaseva Svetlana" }] },
        },
        { "@name": "Task", "@numFmtId": "0", sharedItems: {} },
        { "@name": "Over-Time", "@numFmtId": "0", sharedItems: {} },
        { "@name": "Man-Hours", "@numFmtId": "0", sharedItems: {} },
      ],
    },
  };

  const actualPivotCacheDefinition = makePivotCacheDefinition({
    employees: [
      {
        lastName: "Karaseva",
        firstName: "Svetlana",
        jiraUsername: "KarasevaS",
      },
    ],
    tableBottomRightPoint: { row: 9, column: 3 },
  });

  expect(actualPivotCacheDefinition).toEqual(expectedPivotCacheDefinition);
});

test("pass several employee, expect to return pivot cache definition with several employees", () => {
  const expectedPivotCacheDefinition: PivotCacheDefinition = {
    "@xmlns": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "@xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "@r:id": "rId1",
    cacheSource: {
      "@type": "worksheet",
      worksheetSource: {
        "@ref": "B8:C10",
        "@sheet": "Monthly timesheet",
      },
    },
    cacheFields: {
      "@count": 8,
      cacheField: [
        { "@name": "Unit", "@numFmtId": "0", sharedItems: {} },
        { "@name": "Interco", "@numFmtId": "0", sharedItems: {} },
        { "@name": "Product", "@numFmtId": "0", sharedItems: {} },
        { "@name": "Project", "@numFmtId": "0", sharedItems: {} },
        {
          "@name": "Employee",
          "@numFmtId": "0",
          sharedItems: {
            "@count": 2,
            s: [{ "@v": "Karaseva Svetlana" }, { "@v": "Matrosova Marianna" }],
          },
        },
        { "@name": "Task", "@numFmtId": "0", sharedItems: {} },
        { "@name": "Over-Time", "@numFmtId": "0", sharedItems: {} },
        { "@name": "Man-Hours", "@numFmtId": "0", sharedItems: {} },
      ],
    },
  };

  const actualPivotCacheDefinition = makePivotCacheDefinition({
    employees: [
      {
        lastName: "Karaseva",
        firstName: "Svetlana",
        jiraUsername: "KarasevaS",
      },
      {
        lastName: "Matrosova",
        firstName: "Marianna",
        jiraUsername: "MatrosovaM",
      },
    ],
    tableBottomRightPoint: { row: 10, column: 3 },
  });

  expect(actualPivotCacheDefinition).toEqual(expectedPivotCacheDefinition);
});
