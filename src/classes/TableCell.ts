import { Point } from "./Point";
import { Style } from "./Style";

export class TableCell<T> {
  public styles: Style[];
  public point: Point;
  public value: T;

  constructor({
    point,
    value,
    styles,
  }: {
    point: Point;
    value: T;
    styles: Style[];
  }) {
    this.point = { column: point.column, row: point.row };
    this.value = value;
    this.styles = styles;
  }
}
