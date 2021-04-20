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
  let rows: TableCell[] = [];
  let startMonthHeaderPoint: Point = getStartMonthHeaderPoint();
  let currentDate: Date = new Date();

  rows.push(
    new TableCell(startMonthHeaderPoint, getMonthHeaderName(), [
      makeBoldCellTextStyle(),
      makeDefaultTextStyle(),
    ])
  );
  ++startMonthHeaderPoint.row;
  rows.push(
    new TableCell(
      startMonthHeaderPoint,
      getMonthNames()[currentDate.getMonth()],
      [
        makeYellowBackgroundStyle(),
        makeStyleHorizontalAlignText("right"),
        makeDefaultTextStyle(),
      ]
    )
  );
  ++startMonthHeaderPoint.column;
  rows.push(
    new TableCell(startMonthHeaderPoint, currentDate.getFullYear().toString(), [
      makeYellowBackgroundStyle(),
      makeStyleHorizontalAlignText("left"),
      makeDefaultTextStyle(),
    ])
  );
  return rows;
}
