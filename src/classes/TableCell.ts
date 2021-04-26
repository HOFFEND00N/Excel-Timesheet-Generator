import { Point } from "./Point";
import { Style } from "./Style";

export interface TableCell<T> {
  styles: Style[];
  point: Point;
  value: T;
}
