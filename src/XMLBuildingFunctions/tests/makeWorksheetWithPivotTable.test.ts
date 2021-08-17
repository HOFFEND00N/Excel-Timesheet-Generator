import { Worksheet } from "../types";
import { Employee } from "../../classes/Employee";
import { makeWorksheetWithPivotTable } from "../makeWorksheetWithPivotTable";

test("pass 2 employees, expect to return correct worksheet", () => {
  const employees: Employee[] = [
    { name: "Karaseva Svetlana", jiraUsername: "KarasevaS" },
    { name: "Matrosova Marianna", jiraUsername: "MatrosovaM" },
  ];
  const expectedWorksheetWithPivotTable: Worksheet = {
    "@xmlns": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    dimension: { "@ref": `A3:B6` },
    sheetFormatPr: { "@defaultRowHeight": 15 },
    cols: {
      col: [
        {
          "@width": 20,
          "@bestFit": true,
          "@min": 1,
          "@max": 1,
          "@customWidth": true,
        },
        {
          "@width": 17.125,
          "@bestFit": true,
          "@min": 2,
          "@max": 2,
          "@customWidth": true,
        },
      ],
    },
    sheetData: {
      row: [
        {
          "@r": 3,
          c: [
            { "@r": "A3", "@t": "str", v: "Row Labels" },
            { "@r": "B3", "@t": "str", v: "Sum of Man-Hours" },
          ],
        },
        {
          "@r": 4,
          c: [
            { "@r": "A4", "@t": "str", v: "Karaseva Svetlana" },
            { "@r": "B4", v: 160 },
          ],
        },
        {
          "@r": 5,
          c: [
            { "@r": "A5", "@t": "str", v: "Matrosova Marianna" },
            { "@r": "B5", v: 140 },
          ],
        },
        {
          "@r": 6,
          c: [
            { "@r": `A6`, "@t": "str", v: "Grand Total" },
            {
              "@r": `B6`,
              v: 300,
            },
          ],
        },
      ],
    },
  };

  const actualWorksheetWithPivotTable = makeWorksheetWithPivotTable({
    employees,
    workingHoursByEmployeesUsername: {
      KarasevaS: 160,
      MatrosovaM: 140,
    },
  });

  expect(actualWorksheetWithPivotTable).toEqual(expectedWorksheetWithPivotTable);
});
