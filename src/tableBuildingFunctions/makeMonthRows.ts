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

export function makeMonthRows(currentDate: Date): CommonCell[] {
  const monthRows: CommonCell[] = [];
  const { row, column }: Point = getStartMonthHeaderPoint();
  monthRows.push({
    point: { row, column },
    value: getMontlyTimesheetHeader(),
    styles: [makeBoldCellTextStyle(), makeDefaultTextStyle()],
  });
  monthRows.push({
    point: { row: row + 1, column },
    value: getMonthNames(currentDate.getMonth()),
    styles: [
      makeYellowBackgroundStyle(),
      makeStyleHorizontalAlignText(HorizontalAlignTextWays.right),
      makeDefaultTextStyle(),
    ],
  });
  monthRows.push({
    point: { row: row + 1, column: column + 1 },
    value: currentDate.getFullYear(),
    styles: [
      makeYellowBackgroundStyle(),
      makeStyleHorizontalAlignText(HorizontalAlignTextWays.left),
      makeDefaultTextStyle(),
    ],
  });
  return monthRows;
}
