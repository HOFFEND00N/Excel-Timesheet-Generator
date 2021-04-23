import { TableCell } from "../classes/TableCell";
import { Point } from "../classes/Point";
import { CommonValue } from "./types";

export function makeTableRow<T = CommonValue>({
  startPoint,
  values,
}: {
  startPoint: Point;
  values: T[];
}) {
  const row: TableCell<T>[] = [];
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    row.push(
      new TableCell({
        point: { column: startPoint.column + i, row: startPoint.row },
        value: value,
        styles: [],
      })
    );
  }
  return row;
}
