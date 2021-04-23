import {
  getMontlyTimesheetHeader,
  getMonthNames,
  getStartMonthHeaderPoint,
} from "../constants/constant";
import {
  makeBoldCellTextStyle,
  makeDefaultTextStyle,
  makeStyleHorizontalAlignText,
  makeYellowBackgroundStyle,
} from "../constants/styleConstants";
import { TableCell } from "../classes/TableCell";
import { Point } from "../classes/Point";
import { CommonCell } from "./types";

export function makeMonthRows() {
  const rows: CommonCell[] = [];
  const {
    row: pointRow,
    column: pointColumn,
  }: Point = getStartMonthHeaderPoint();
  const currentDate: Date = new Date();

  rows.push(
    new TableCell({
      point: { row: pointRow, column: pointColumn },
      value: getMontlyTimesheetHeader(),
      styles: [makeBoldCellTextStyle(), makeDefaultTextStyle()],
    })
  );
  rows.push(
    new TableCell({
      point: { row: pointRow + 1, column: pointColumn },
      value: getMonthNames(currentDate.getMonth()),
      styles: [
        makeYellowBackgroundStyle(),
        makeStyleHorizontalAlignText("right"),
        makeDefaultTextStyle(),
      ],
    })
  );
  rows.push(
    new TableCell({
      point: { row: pointRow + 1, column: pointColumn + 1 },
      value: currentDate.getFullYear(),
      styles: [
        makeYellowBackgroundStyle(),
        makeStyleHorizontalAlignText("left"),
        makeDefaultTextStyle(),
      ],
    })
  );
  return rows;
}
