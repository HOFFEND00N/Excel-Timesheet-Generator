import { IEmployee } from "../models/IEmployee";
import { HoursByEmployees } from "../tableBuildingFunctions/types";
import { Row } from "./types";

export function makeWorksheetWithPivotTable({
  employees,
  workingHoursByEmployeesUsername,
}: {
  employees: IEmployee[];
  workingHoursByEmployeesUsername: HoursByEmployees;
}) {
  const pivotTableOffset = 4;
  return {
    "@xmlns": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    dimension: {
      "@ref": `A3:B${getLastPivotTableColumn({ employees, pivotTableOffset })}`,
    },
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
      row: makeSheetDataRows(employees, workingHoursByEmployeesUsername, pivotTableOffset),
    },
  };
}

function makeSheetDataRows(
  employees: IEmployee[],
  workingHoursByEmployeesUsername: HoursByEmployees,
  pivotTableOffset: number
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
    const rowIndex = i + pivotTableOffset;
    rows.push({
      "@r": rowIndex,
      c: [
        {
          "@r": `A${rowIndex}`,
          "@t": "str",
          v: `${employees[i].name}`,
        },
        {
          "@r": `B${rowIndex}`,
          v: workingHoursByEmployeesUsername[employees[i].jiraUsername],
        },
      ],
    });
  }

  rows.push({
    "@r": getLastPivotTableColumn({ employees, pivotTableOffset }),
    c: [
      {
        "@r": `A${getLastPivotTableColumn({ employees, pivotTableOffset })}`,
        "@t": "str",
        v: "Grand Total",
      },
      {
        "@r": `B${getLastPivotTableColumn({ employees, pivotTableOffset })}`,
        v: employees.reduce((sum, employee) => sum + workingHoursByEmployeesUsername[employee.jiraUsername], 0),
      },
    ],
  });
  return rows;
}

function getLastPivotTableColumn({
  employees,
  pivotTableOffset,
}: {
  employees: IEmployee[];
  pivotTableOffset: number;
}) {
  return employees.length + pivotTableOffset;
}
