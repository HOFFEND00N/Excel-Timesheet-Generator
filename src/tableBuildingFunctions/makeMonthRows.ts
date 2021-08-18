import {
  MONTHLY_TIMESHEET_HEADER,
  MONTHS,
  START_MONTH_HEADER_POINT,
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
  const { row, column }: Point = START_MONTH_HEADER_POINT;
  monthRows.push({
    point: { row, column },
    value: MONTHLY_TIMESHEET_HEADER,
    styles: [makeBoldCellTextStyle(), makeDefaultTextStyle()],
  });
  monthRows.push({
    point: { row: row + 1, column },
    value: MONTHS[currentDate.getMonth()],
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
