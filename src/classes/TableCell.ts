import { Point } from "./Point";

export class TableCell {
  public styles: any[];
  public point: Point;
  public value: any;

  constructor(point: Point, value: any, styles: any[]) {
    this.point = new Point(point.column, point.row);
    this.value = value;
    this.styles = styles;
  }
}
