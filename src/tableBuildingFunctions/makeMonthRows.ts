import {
  getMonthHeaderName,
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

export function makeMonthRows() {
  let rows: Array<TableCell> = [];
  let startMonthHeaderPoint: Point = getStartMonthHeaderPoint();
  let curDate: Date = new Date();

  rows.push(
    new TableCell(startMonthHeaderPoint, getMonthHeaderName(), [
      makeBoldCellTextStyle(),
      makeDefaultTextStyle(),
    ])
  );
  ++startMonthHeaderPoint.row;
  rows.push(
    new TableCell(startMonthHeaderPoint, getMonthNames()[curDate.getMonth()], [
      makeYellowBackgroundStyle(),
      makeStyleHorizontalAlignText("right"),
      makeDefaultTextStyle(),
    ])
  );
  ++startMonthHeaderPoint.col;
  rows.push(
    new TableCell(startMonthHeaderPoint, curDate.getFullYear().toString(), [
      makeYellowBackgroundStyle(),
      makeStyleHorizontalAlignText("left"),
      makeDefaultTextStyle(),
    ])
  );
  return rows;
}
