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
  const { column, row } = getStartMonthHeaderPoint();

  const expectedTable: CommonCell[] = [
    {
      point: startMonthHeaderPoint,
      value: getMontlyTimesheetHeader(),
      styles: [makeBoldCellTextStyle(), makeDefaultTextStyle()],
    },
    {
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
    },
    {
      point: {
        column: column + 1,
        row: row + 1,
      },
      value: currentDate.getFullYear(),
      styles: [
        makeYellowBackgroundStyle(),
        makeStyleHorizontalAlignText("left"),
        makeDefaultTextStyle(),
      ],
    },
  ];

  const actualTable = makeMonthRows(currentDate);

  expect(actualTable).toEqual(expectedTable);
});
