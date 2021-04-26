import { TableCell } from "../classes/TableCell";
import { Point } from "../classes/Point";
import { CommonCell, CommonValue } from "./types";

export function makeTableRow({
  startPoint,
  values,
}: {
  startPoint: Point;
  values: CommonValue[];
}) {
  const row: CommonCell[] = [];
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
