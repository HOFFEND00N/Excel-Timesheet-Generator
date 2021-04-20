import excel from "excel4node";
import { makeTable } from "../build/tableBuildingFunctions/makeTable";
import {
  getMonthHeaderName,
  getMonthNames,
  getStartMonthHeaderPoint,
  getStartTablePoint,
  getTableHeaders,
  getWorksheetName,
} from "../build/constants/constant";
import {
  makeCellBorderStyle,
  makeBoldCellTextStyle,
  makeStyleHorizontalAlignText,
  makeYellowBackgroundStyle,
  makeDefaultTextStyle,
} from "../build/constants/styleConstants";
import { TableCell } from "../build/classes/TableCell";
import { Point } from "../build/classes/Point";
import { TableData } from "../src/classes/TableData";
import * as fs from "fs";

test("table data is empty expect just table headers + date", () => {
  let expectedTable: Array<TableCell> = [];
  let startMonthHeaderPoint: Point = getStartMonthHeaderPoint();
  let curDate: Date = new Date();
  expectedTable.push(
    new TableCell(startMonthHeaderPoint, getMonthHeaderName(), [
      makeBoldCellTextStyle(),
      makeDefaultTextStyle(),
    ])
  );
  expectedTable.push(
    new TableCell(
      new Point(startMonthHeaderPoint.col, ++startMonthHeaderPoint.row),
      getMonthNames()[curDate.getMonth()],
      [
        makeYellowBackgroundStyle(),
        makeStyleHorizontalAlignText("right"),
        makeDefaultTextStyle(),
      ]
    )
  );
  expectedTable.push(
    new TableCell(
      new Point(++startMonthHeaderPoint.col, startMonthHeaderPoint.row),
      curDate.getFullYear().toString(),
      [
        makeYellowBackgroundStyle(),
        makeStyleHorizontalAlignText("left"),
        makeDefaultTextStyle(),
      ]
    )
  );

  let headerStyles: Array<object> = [
    makeBoldCellTextStyle(),
    makeCellBorderStyle(),
    makeDefaultTextStyle(),
  ];
  let startTablePoint = getStartTablePoint();
  let tableHeaders = getTableHeaders();
  for (const tableHeader of tableHeaders) {
    expectedTable.push(
      new TableCell(
        new Point(startTablePoint.col++, startTablePoint.row),
        tableHeader,
        headerStyles
      )
    );
  }

  let actualTable = makeTable({}, getStartTablePoint());

  expect(actualTable).toEqual(expectedTable);
});

test("make full table", () => {
  let expectedTable: Array<TableCell> = [];
  let startMonthHeaderPoint: Point = getStartMonthHeaderPoint();
  let curDate: Date = new Date();
  expectedTable.push(
    new TableCell(startMonthHeaderPoint, getMonthHeaderName(), [
      makeBoldCellTextStyle(),
      makeDefaultTextStyle(),
    ])
  );

  expectedTable.push(
    new TableCell(
      new Point(startMonthHeaderPoint.col, ++startMonthHeaderPoint.row),
      getMonthNames()[curDate.getMonth()],
      [
        makeYellowBackgroundStyle(),
        makeStyleHorizontalAlignText("right"),
        makeDefaultTextStyle(),
      ]
    )
  );
  expectedTable.push(
    new TableCell(
      new Point(++startMonthHeaderPoint.col, startMonthHeaderPoint.row),
      curDate.getFullYear().toString(),
      [
        makeYellowBackgroundStyle(),
        makeStyleHorizontalAlignText("left"),
        makeDefaultTextStyle(),
      ]
    )
  );

  let startTablePoint = getStartTablePoint();
  let tableHeaders = getTableHeaders();
  for (const tableHeader of tableHeaders) {
    expectedTable.push(
      new TableCell(
        new Point(startTablePoint.col++, startTablePoint.row),
        tableHeader,
        [makeBoldCellTextStyle(), makeCellBorderStyle(), makeDefaultTextStyle()]
      )
    );
  }
  let expectedTableRows: Array<Array<string>> = [
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

  let startPoint = getStartTablePoint();
  startPoint.row++;
  for (const expectedTableRow of expectedTableRows) {
    let i: number = 0;
    for (const value of expectedTableRow) {
      expectedTable.push(
        new TableCell(new Point(startPoint.col + i, startPoint.row), value, [
          makeCellBorderStyle(),
          makeDefaultTextStyle(),
        ])
      );
      i++;
    }
    startPoint.row++;
  }

  let tabledata: TableData = JSON.parse(
    fs.readFileSync("tableData.json", "utf-8")
  );
  let actualTable = makeTable(tabledata, getStartTablePoint());

  actualTable.sort(compare);
  expectedTable.sort(compare);

  expect(actualTable).toEqual(expectedTable);
});

function compare(a: TableCell, b: TableCell) {
  let columnDiff: number = a.point.col - b.point.col;
  if (columnDiff != 0) return columnDiff;
  else return a.point.row - b.point.row;
}
