import { TableCell } from "../classes/TableCell";
import { Point } from "../classes/Point";

export function makeTableRow({
  startPoint,
  values,
}: {
  startPoint: Point;
  values: any[];
}) {
  let row: TableCell[] = [];
  let i: number = 0;
  for (const value of values) {
    row.push(
      new TableCell(
        new Point(startPoint.column + i++, startPoint.row),
        value,
        []
      )
    );
  }
  return row;
}
