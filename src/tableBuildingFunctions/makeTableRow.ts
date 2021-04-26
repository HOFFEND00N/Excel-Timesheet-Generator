import { Point } from "../classes/Point";
import { CommonCell, CommonValue, NumberValue, StringValue } from "./types";
import { TableCell } from "../classes/TableCell";

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
    row.push(<TableCell<StringValue> | TableCell<NumberValue>>{
      point: { column: startPoint.column + i, row: startPoint.row },
      value: value,
      styles: [],
    });
  }
  return row;
}
