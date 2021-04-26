import { Point } from "./Point";
import { Style } from "./Style";
import { CommonValue } from "../tableBuildingFunctions/types";

export class TableCell {
  public styles: Style[];
  public point: Point;
  public value: CommonValue;

  constructor({
    point,
    value,
    styles,
  }: {
    point: Point;
    value: CommonValue;
    styles: Style[];
  }) {
    this.point = { column: point.column, row: point.row };
    this.value = value;
    this.styles = styles;
  }
}
