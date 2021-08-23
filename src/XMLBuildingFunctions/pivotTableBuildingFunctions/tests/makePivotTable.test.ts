import { PivotTableDefinition } from "../../types/PivotTableDefinition";
import { TABLE_HEADERS } from "../../../constants/constant";
import { Employee } from "../../../classes/Employee";
import { makePivotTable } from "../makePivotTable";

test("pass one employee, expect to return pivot table definition", () => {
  const employees: Employee[] = [{ name: "Karaseva Svetlana", jiraUsername: "KarasevaS" }];
  const expectedPivotTableDefinition: PivotTableDefinition = {
    "@xmlns": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "@name": "PivotTable1",
    "@cacheId": "1",
    "@dataCaption": "Values",
    location: {
      "@ref": `A3:B${employees.length + 4}`,
      "@firstHeaderRow": 1,
      "@firstDataRow": 1,
      "@firstDataCol": 1,
    },
    pivotFields: {
      "@count": TABLE_HEADERS.length,
      pivotField: [
        {
          "@showAll": "0",
        },
        {
          "@showAll": "0",
        },
        {
          "@showAll": "0",
        },
        {
          "@showAll": "0",
        },
        {
          "@showAll": "0",
          "@axis": "axisRow",
          items: {
            "@count": employees.length + 1,
            item: [{ "@x": "0" }, { "@t": "default" }],
          },
        },
        {
          "@showAll": "0",
        },
        {
          "@showAll": "0",
        },
        {
          "@showAll": "0",
          "@dataField": "1",
        },
      ],
    },
    rowFields: {
      "@count": 1,
      field: { "@x": 1 },
    },
    rowItems: {
      "@count": employees.length + 1,
      i: [{ x: { "@v": "0" } }, { "@t": "grand", x: {} }],
    },
    dataFields: {
      "@count": 1,
      dataField: {
        "@name": "Sum of Man-Hours",
        "@fld": 2,
        "@baseField": "0",
        "@baseItem": "0",
      },
    },
    pivotTableStyleInfo: {
      "@name": "PivotStyleLight16",
      "@showRowHeaders": true,
      "@showColHeaders": true,
      "@showRowStripes": false,
      "@showColStripes": false,
      "@showLastColumn": true,
    },
  };

  const actualPivotTableDefinition = makePivotTable({
    employees,
    employeeColumnIndex: 1,
    manHoursColumnIndex: 2,
  });

  expect(actualPivotTableDefinition).toEqual(expectedPivotTableDefinition);
});
