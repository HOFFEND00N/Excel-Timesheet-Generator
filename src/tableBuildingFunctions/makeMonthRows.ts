import {
  getMonthNames,
  getMontlyTimesheetHeader,
  getStartMonthHeaderPoint,
} from "../constants/constant";
import {
  HorizontalAlignTextWays,
  makeBoldCellTextStyle,
  makeDefaultTextStyle,
  makeStyleHorizontalAlignText,
  makeYellowBackgroundStyle,
} from "../constants/styleConstants";
import { Point } from "../classes/Point";
import { CommonCell } from "./types";

export function makeMonthRows(currentDate: Date) {
  const rows: CommonCell[] = [];
  const { row, column }: Point = getStartMonthHeaderPoint();
  rows.push({
    point: { row, column },
    value: getMontlyTimesheetHeader(),
    styles: [makeBoldCellTextStyle(), makeDefaultTextStyle()],
  });
  rows.push({
    point: { row: row + 1, column },
    value: getMonthNames(currentDate.getMonth()),
    styles: [
      makeYellowBackgroundStyle(),
      makeStyleHorizontalAlignText(HorizontalAlignTextWays.right),
      makeDefaultTextStyle(),
    ],
  });
  rows.push({
    point: { row: row + 1, column: column + 1 },
    value: currentDate.getFullYear(),
    styles: [
      makeYellowBackgroundStyle(),
      makeStyleHorizontalAlignText(HorizontalAlignTextWays.left),
      makeDefaultTextStyle(),
    ],
  });
  return rows;
}
