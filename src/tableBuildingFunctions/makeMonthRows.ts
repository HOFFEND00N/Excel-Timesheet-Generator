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

export function makeMonthRows() {
  const rows: TableCell[] = [];
  const {
    row: pointRow,
    column: pointColumn,
  }: Point = getStartMonthHeaderPoint();
  const currentDate: Date = new Date();

  rows.push(
    new TableCell(
      { row: pointRow, column: pointColumn },
      getMontlyTimesheetHeader(),
      [makeBoldCellTextStyle(), makeDefaultTextStyle()]
    )
  );
  rows.push(
    new TableCell(
      { row: pointRow + 1, column: pointColumn },
      getMonthNames(currentDate.getMonth()),
      [
        makeYellowBackgroundStyle(),
        makeStyleHorizontalAlignText("right"),
        makeDefaultTextStyle(),
      ]
    )
  );
  rows.push(
    new TableCell(
      { row: pointRow + 1, column: pointColumn + 1 },
      currentDate.getFullYear().toString(),
      [
        makeYellowBackgroundStyle(),
        makeStyleHorizontalAlignText("left"),
        makeDefaultTextStyle(),
      ]
    )
  );
  return rows;
}
