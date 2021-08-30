import { IPoint } from "./IPoint";
import { IStyle } from "./IStyle";

export interface ITableCell<T> {
  styles: IStyle[];
  point: IPoint;
  value: T;
}
