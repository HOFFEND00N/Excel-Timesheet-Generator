import { TableCell } from "../build/classes/TableCell";
import {
  getMontlyTimesheetHeader,
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
  let currentDate: Date = new Date();
  let expectedTable: Array<TableCell> = [
    new TableCell(startMonthHeaderPoint, getMontlyTimesheetHeader(), [
      makeBoldCellTextStyle(),
      makeDefaultTextStyle(),
    ]),
    new TableCell(
      new Point(startMonthHeaderPoint.column, ++startMonthHeaderPoint.row),
      getMonthNames(currentDate.getMonth()),
      [
        makeYellowBackgroundStyle(),
        makeStyleHorizontalAlignText("right"),
        makeDefaultTextStyle(),
      ]
    ),
    new TableCell(
      new Point(++startMonthHeaderPoint.column, startMonthHeaderPoint.row),
      currentDate.getFullYear().toString(),
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
