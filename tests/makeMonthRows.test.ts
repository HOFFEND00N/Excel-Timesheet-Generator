import { TableCell } from "../src/classes/TableCell";
import {
  getMontlyTimesheetHeader,
  getMonthNames,
  getStartMonthHeaderPoint,
} from "../src/constants/constant";
import {
  makeBoldCellTextStyle,
  makeStyleHorizontalAlignText,
  makeYellowBackgroundStyle,
  makeDefaultTextStyle,
} from "../src/constants/styleConstants";
import { Point } from "../src/classes/Point";
import { makeMonthRows } from "../src/tableBuildingFunctions/makeMonthRows";
import { CommonCell } from "../src/tableBuildingFunctions/types";

test("make date section of table + header, expect current month + year + header", () => {
  const startMonthHeaderPoint: Point = getStartMonthHeaderPoint();
  const currentDate: Date = new Date();
  const expectedTable: CommonCell[] = [
    new TableCell({
      point: startMonthHeaderPoint,
      value: getMontlyTimesheetHeader(),
      styles: [makeBoldCellTextStyle(), makeDefaultTextStyle()],
    }),
    new TableCell({
      point: {
        column: startMonthHeaderPoint.column,
        row: ++startMonthHeaderPoint.row,
      },
      value: getMonthNames(currentDate.getMonth()),
      styles: [
        makeYellowBackgroundStyle(),
        makeStyleHorizontalAlignText("right"),
        makeDefaultTextStyle(),
      ],
    }),
    new TableCell({
      point: {
        column: ++startMonthHeaderPoint.column,
        row: startMonthHeaderPoint.row,
      },
      value: currentDate.getFullYear(),
      styles: [
        makeYellowBackgroundStyle(),
        makeStyleHorizontalAlignText("left"),
        makeDefaultTextStyle(),
      ],
    }),
  ];

  const actualTable = makeMonthRows();

  expect(actualTable).toEqual(expectedTable);
});
