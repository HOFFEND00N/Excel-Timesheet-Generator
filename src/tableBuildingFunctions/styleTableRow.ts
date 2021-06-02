import { Style } from "../classes/Style";
import { CommonCell } from "./types";

export function styleTableRow({
  row,
  cellStyles,
}: {
  row: CommonCell[];
  cellStyles: Style[];
}): void {
  for (let i = 0; i < row.length; i++) {
    row[i].styles.push(...cellStyles);
  }
}
