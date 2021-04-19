import { Point } from "./Point";

export class TableCell {
  public styles: Array<object>;
  public point: Point;
  public value: any;

  constructor(point: Point, value: any, styles: Array<object>) {
    this.point = new Point(point.col, point.row);
    this.value = value;
    this.styles = [];
    for (const style of styles) {
      this.styles.push(style);
    }
  }
}
