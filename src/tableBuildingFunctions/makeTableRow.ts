import { Point } from "../classes/Point";
import { TableCell } from "../classes/TableCell";
import { CommonCell, CommonValue, NumberValue, StringValue } from "./types";

export function makeTableRow({ startPoint, values }: { startPoint: Point; values: CommonValue[] }): CommonCell[] {
  return values.map(
    (value, index) =>
      <TableCell<StringValue> | TableCell<NumberValue>>{
        point: { column: startPoint.column + index, row: startPoint.row },
        value: value,
        styles: [],
      }
  );
}
