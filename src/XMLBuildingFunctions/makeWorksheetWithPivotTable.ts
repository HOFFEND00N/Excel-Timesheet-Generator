import { Employee } from "../classes/Employee";
import { Row } from "./types";

export function makeWorksheetWithPivotTable({
  employees,
  workingHoursPerMonth,
}: {
  employees: Employee[];
  workingHoursPerMonth: number;
}) {
  return {
    "@xmlns": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    dimension: { "@ref": `A3:B${employees.length + 4}` },
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
      row: makeSheetDataRows(employees, workingHoursPerMonth),
    },
  };
}

function makeSheetDataRows(
  employees: Employee[],
  workingHoursPerMonth: number
) {
  const rows: Row[] = [];
  rows.push({
    "@r": 3,
    c: [
      { "@r": "A3", "@t": "str", v: "Row Labels" },
      { "@r": "B3", "@t": "str", v: "Sum of Man-Hours" },
    ],
  });

  for (let i = 0; i < employees.length; i++) {
    rows.push({
      "@r": i + 4,
      c: [
        { "@r": `A${i + 4}`, "@t": "str", v: `${employees[i].name}` },
        {
          "@r": `B${i + 4}`,
          v: `${workingHoursPerMonth}`,
        },
      ],
    });
  }

  rows.push({
    "@r": employees.length + 4,
    c: [
      { "@r": `A${employees.length + 4}`, "@t": "str", v: "Grand Total" },
      {
        "@r": `B${employees.length + 4}`,
        v: `${employees.length * workingHoursPerMonth}`,
      },
    ],
  });
  return rows;
}
