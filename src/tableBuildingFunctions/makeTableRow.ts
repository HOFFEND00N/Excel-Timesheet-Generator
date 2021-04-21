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
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    row.push(
      new TableCell(new Point(startPoint.column + i, startPoint.row), value, [])
    );
  }
  return row;
}
