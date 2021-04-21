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
import { TableCell } from "../src/classes/TableCell";
import { Point } from "../src/classes/Point";
import { TableData } from "../src/classes/TableData";
import * as fs from "fs";
import { Style } from "../src/classes/Style";

test("table data is empty expect just table headers + date", () => {
  const expectedTable: Array<TableCell> = [];
  const startMonthHeaderPoint: Point = getStartMonthHeaderPoint();
  const currentDate: Date = new Date();
  expectedTable.push(
    new TableCell(startMonthHeaderPoint, getMontlyTimesheetHeader(), [
      makeBoldCellTextStyle(),
      makeDefaultTextStyle(),
    ])
  );
  expectedTable.push(
    new TableCell(
      new Point(startMonthHeaderPoint.column, ++startMonthHeaderPoint.row),
      getMonthNames(currentDate.getMonth()),
      [
        makeYellowBackgroundStyle(),
        makeStyleHorizontalAlignText("right"),
        makeDefaultTextStyle(),
      ]
    )
  );
  expectedTable.push(
    new TableCell(
      new Point(++startMonthHeaderPoint.column, startMonthHeaderPoint.row),
      currentDate.getFullYear().toString(),
      [
        makeYellowBackgroundStyle(),
        makeStyleHorizontalAlignText("left"),
        makeDefaultTextStyle(),
      ]
    )
  );

  const headerStyles: Array<Style> = [
    makeBoldCellTextStyle(),
    makeCellBorderStyle(),
    makeDefaultTextStyle(),
  ];
  const startTablePoint = getStartTablePoint();
  const tableHeaders = getTableHeaders();
  for (const tableHeader of tableHeaders) {
    expectedTable.push(
      new TableCell(
        new Point(startTablePoint.column++, startTablePoint.row),
        tableHeader,
        headerStyles
      )
    );
  }

  const actualTable = makeTable(
    {
      employees: [],
      companyCode: "",
      companyName: "",
      unit: "",
      project: "",
    },
    getStartTablePoint()
  );

  expect(actualTable).toEqual(expectedTable);
});

test("make full table", () => {
  const expectedTable: Array<TableCell> = [];
  const startMonthHeaderPoint: Point = getStartMonthHeaderPoint();
  const currentDate: Date = new Date();
  expectedTable.push(
    new TableCell(startMonthHeaderPoint, getMontlyTimesheetHeader(), [
      makeBoldCellTextStyle(),
      makeDefaultTextStyle(),
    ])
  );

  expectedTable.push(
    new TableCell(
      new Point(startMonthHeaderPoint.column, ++startMonthHeaderPoint.row),
      getMonthNames(currentDate.getMonth()),
      [
        makeYellowBackgroundStyle(),
        makeStyleHorizontalAlignText("right"),
        makeDefaultTextStyle(),
      ]
    )
  );
  expectedTable.push(
    new TableCell(
      new Point(++startMonthHeaderPoint.column, startMonthHeaderPoint.row),
      currentDate.getFullYear().toString(),
      [
        makeYellowBackgroundStyle(),
        makeStyleHorizontalAlignText("left"),
        makeDefaultTextStyle(),
      ]
    )
  );

  const startTablePoint = getStartTablePoint();
  const tableHeaders = getTableHeaders();
  for (const tableHeader of tableHeaders) {
    expectedTable.push(
      new TableCell(
        new Point(startTablePoint.column++, startTablePoint.row),
        tableHeader,
        [makeBoldCellTextStyle(), makeCellBorderStyle(), makeDefaultTextStyle()]
      )
    );
  }
  const expectedTableRows: string[][] = [
    ["651", "NO", "Confirmit", "Studio", "Kachalov Alexey"],
    ["651", "NO", "Confirmit", "Studio", "Kolokolenkina Natalia"],
    ["651", "NO", "Confirmit", "Studio", "Kozlova Anna"],
    ["651", "NO", "Confirmit", "Studio", "Pisarenko Dmitry"],
    ["651", "NO", "Confirmit", "Studio", "Popov Sergey"],
    ["651", "NO", "Confirmit", "Studio", "Protasov Ilya"],
    ["651", "NO", "Confirmit", "Studio", "Sumatokhin Alexey"],
    ["651", "NO", "Confirmit", "Studio", "Volyakov Dmitry"],
    ["651", "NO", "Confirmit", "Studio", "Volyakova Kristina"],
  ];

  const startPoint = getStartTablePoint();
  for (let i = 1; i < expectedTableRows.length; i++) {
    const expectedTableRow = expectedTableRows[i];
    for (let j = 0; j < expectedTableRow.length; j++) {
      const value = expectedTableRow[j];
      expectedTable.push(
        new TableCell(
          new Point(startPoint.column + j, startPoint.row + i),
          value,
          [makeCellBorderStyle(), makeDefaultTextStyle()]
        )
      );
    }
  }

  const tabledata: TableData = JSON.parse(
    fs.readFileSync("tableData.json", "utf-8")
  );
  const actualTable = makeTable(tabledata, getStartTablePoint());

  actualTable.sort(compare);
  expectedTable.sort(compare);

  expect(actualTable).toEqual(expectedTable);
});

function compare(a: TableCell, b: TableCell) {
  const columnDiff: number = a.point.column - b.point.column;
  if (columnDiff != 0) return columnDiff;
  else return a.point.row - b.point.row;
}
