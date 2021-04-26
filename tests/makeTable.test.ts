import { makeTable } from "../src/tableBuildingFunctions/makeTable";
import {
  getMontlyTimesheetHeader,
  getMonthNames,
  getStartMonthHeaderPoint,
  getStartTablePoint,
  getTableHeaders,
} from "../src/constants/constant";
import {
  makeCellBorderStyle,
  makeBoldCellTextStyle,
  makeStyleHorizontalAlignText,
  makeYellowBackgroundStyle,
  makeDefaultTextStyle,
} from "../src/constants/styleConstants";
import { Point } from "../src/classes/Point";
import { TableData } from "../src/classes/TableData";
import * as fs from "fs";
import { Style } from "../src/classes/Style";
import { CommonCell, CommonValue } from "../src/tableBuildingFunctions/types";

test("table data is empty expect just table headers + date", () => {
  const expectedTable: CommonCell[] = [];
  const currentDate: Date = new Date();
  const { column, row }: Point = getStartMonthHeaderPoint();

  expectedTable.push({
    point: {
      column: column,
      row: row,
    },
    value: getMontlyTimesheetHeader(),
    styles: [makeBoldCellTextStyle(), makeDefaultTextStyle()],
  });
  expectedTable.push({
    point: {
      column: column,
      row: row + 1,
    },
    value: getMonthNames(currentDate.getMonth()),
    styles: [
      makeYellowBackgroundStyle(),
      makeStyleHorizontalAlignText("right"),
      makeDefaultTextStyle(),
    ],
  });
  expectedTable.push({
    point: { column: column + 1, row: row + 1 },
    value: currentDate.getFullYear(),
    styles: [
      makeYellowBackgroundStyle(),
      makeStyleHorizontalAlignText("left"),
      makeDefaultTextStyle(),
    ],
  });

  const headerStyles: Array<Style> = [
    makeBoldCellTextStyle(),
    makeCellBorderStyle(),
    makeDefaultTextStyle(),
  ];
  const startTablePoint = getStartTablePoint();
  const tableHeaders = getTableHeaders();
  for (let i = 0; i < tableHeaders.length; i++) {
    const tableHeader = tableHeaders[i];
    expectedTable.push({
      point: { column: startTablePoint.column + i, row: startTablePoint.row },
      value: tableHeader,
      styles: headerStyles,
    });
  }

  const actualTable = makeTable(
    {
      employees: [],
      companyCode: "",
      companyName: "",
      unit: "",
      project: "",
    },
    currentDate
  );

  expect(actualTable).toEqual(expectedTable);
});

test("make full table", () => {
  const expectedTable: CommonCell[] = [];
  const startMonthHeaderPoint: Point = getStartMonthHeaderPoint();
  const currentDate: Date = new Date();
  expectedTable.push({
    point: startMonthHeaderPoint,
    value: getMontlyTimesheetHeader(),
    styles: [makeBoldCellTextStyle(), makeDefaultTextStyle()],
  });

  expectedTable.push({
    point: {
      column: startMonthHeaderPoint.column,
      row: startMonthHeaderPoint.row + 1,
    },
    value: getMonthNames(currentDate.getMonth()),
    styles: [
      makeYellowBackgroundStyle(),
      makeStyleHorizontalAlignText("right"),
      makeDefaultTextStyle(),
    ],
  });
  expectedTable.push({
    point: {
      column: startMonthHeaderPoint.column + 1,
      row: startMonthHeaderPoint.row + 1,
    },
    value: currentDate.getFullYear(),
    styles: [
      makeYellowBackgroundStyle(),
      makeStyleHorizontalAlignText("left"),
      makeDefaultTextStyle(),
    ],
  });

  const startTablePoint = getStartTablePoint();
  const tableHeaders = getTableHeaders();
  for (let i = 0; i < tableHeaders.length; i++) {
    const tableHeader = tableHeaders[i];
    expectedTable.push({
      point: { column: startTablePoint.column + i, row: startTablePoint.row },
      value: tableHeader,
      styles: [
        makeBoldCellTextStyle(),
        makeCellBorderStyle(),
        makeDefaultTextStyle(),
      ],
    });
  }
  const expectedTableRows: CommonValue[][] = [
    [651, "NO", "Confirmit", "Studio", "Kachalov Alexey"],
    [651, "NO", "Confirmit", "Studio", "Kolokolenkina Natalia"],
    [651, "NO", "Confirmit", "Studio", "Kozlova Anna"],
    [651, "NO", "Confirmit", "Studio", "Pisarenko Dmitry"],
    [651, "NO", "Confirmit", "Studio", "Popov Sergey"],
    [651, "NO", "Confirmit", "Studio", "Protasov Ilya"],
    [651, "NO", "Confirmit", "Studio", "Sumatokhin Alexey"],
    [651, "NO", "Confirmit", "Studio", "Volyakov Dmitry"],
    [651, "NO", "Confirmit", "Studio", "Volyakova Kristina"],
  ];

  const startPoint = getStartTablePoint();
  for (let i = 1; i < expectedTableRows.length; i++) {
    const expectedTableRow = expectedTableRows[i];
    for (let j = 0; j < expectedTableRow.length; j++) {
      const value = expectedTableRow[j];
      let tableCell;
      if (j == 0 || j == 1) {
        tableCell = {
          point: { column: startPoint.column + j, row: startPoint.row + i },
          value: value,
          styles: [
            makeStyleHorizontalAlignText("center"),
            makeCellBorderStyle(),
            makeDefaultTextStyle(),
          ],
        };
      } else {
        tableCell = {
          point: { column: startPoint.column + j, row: startPoint.row + i },
          value: value,
          styles: [makeCellBorderStyle(), makeDefaultTextStyle()],
        };
      }
      expectedTable.push(tableCell);
    }
  }

  const tabledata: TableData = JSON.parse(
    fs.readFileSync("tableData.json", "utf-8")
  );
  const actualTable = makeTable(tabledata, currentDate);

  actualTable.sort(compare);
  expectedTable.sort(compare);

  expect(actualTable).toEqual(expectedTable);
});

function compare(a: CommonCell, b: CommonCell) {
  const columnDiff: number = a.point.column - b.point.column;
  if (columnDiff != 0) return columnDiff;
  else return a.point.row - b.point.row;
}
