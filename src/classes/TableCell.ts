import { Point } from "./Point";
import { Style } from "./Style";

export class TableCell {
  public styles: Style[];
  public point: Point;
  public value: any;

  constructor(point: Point, value: any, styles: Style[]) {
    this.point = new Point(point.column, point.row);
    this.value = value;
    this.styles = styles;
  }
}
