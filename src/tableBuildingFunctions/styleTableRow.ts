import { IStyle } from "../models/IStyle";
import { CommonCell } from "./types";

export function styleTableRow({ row, cellStyles }: { row: CommonCell[]; cellStyles: IStyle[] }) {
  for (let i = 0; i < row.length; i++) {
    row[i].styles.push(...cellStyles);
  }
}
