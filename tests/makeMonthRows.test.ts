import { TableCell } from "../build/classes/TableCell";
import {
  getMonthHeaderName,
  getMonthNames,
  getStartMonthHeaderPoint,
} from "../build/constants/constant";
import {
  makeBoldCellTextStyle,
  makeStyleHorizontalAlignText,
  makeYellowBackgroundStyle,
  makeDefaultTextStyle,
} from "../build/constants/styleConstants";
import { Point } from "../build/classes/Point";
import { makeMonthRows } from "../build/tableBuildingFunctions/makeMonthRows";

test("make date section of talbe + header, expect current month + year + header", () => {
  let startMonthHeaderPoint: Point = getStartMonthHeaderPoint();
  let curDate: Date = new Date();
  let expectedTable: Array<TableCell> = [
    new TableCell(startMonthHeaderPoint, getMonthHeaderName(), [
      makeBoldCellTextStyle(),
      makeDefaultTextStyle(),
    ]),
    new TableCell(
      new Point(startMonthHeaderPoint.column, ++startMonthHeaderPoint.row),
      getMonthNames()[curDate.getMonth()],
      [
        makeYellowBackgroundStyle(),
        makeStyleHorizontalAlignText("right"),
        makeDefaultTextStyle(),
      ]
    ),
    new TableCell(
      new Point(++startMonthHeaderPoint.column, startMonthHeaderPoint.row),
      curDate.getFullYear().toString(),
      [
        makeYellowBackgroundStyle(),
        makeStyleHorizontalAlignText("left"),
        makeDefaultTextStyle(),
      ]
    ),
  ];

  let actualTable = makeMonthRows();

  expect(actualTable).toEqual(expectedTable);
});
