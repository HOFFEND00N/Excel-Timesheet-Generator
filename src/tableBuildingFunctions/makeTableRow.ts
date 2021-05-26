import { Point } from "../classes/Point";
import { CommonCell, CommonValue, NumberValue, StringValue } from "./types";
import { TableCell } from "../classes/TableCell";

export function makeTableRow({
  startPoint,
  values,
}: {
  startPoint: Point;
  values: CommonValue[];
}): CommonCell[] {
  const row: CommonCell[] = values.map(
    (value, index) =>
      <TableCell<StringValue> | TableCell<NumberValue>>{
        point: { column: startPoint.column + index, row: startPoint.row },
        value: value,
        styles: [],
      }
  );

  return row;
}
