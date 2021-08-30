import { IPoint } from "../models/IPoint";
import { ITableCell } from "../models/ITableCell";
import { CommonCell, CommonValue, NumberValue, StringValue } from "./types";

export function makeTableRow({ startPoint, values }: { startPoint: IPoint; values: CommonValue[] }): CommonCell[] {
  return values.map(
    (value, index) =>
      <ITableCell<StringValue> | ITableCell<NumberValue>>{
        point: { column: startPoint.column + index, row: startPoint.row },
        value: value,
        styles: [],
      }
  );
}
