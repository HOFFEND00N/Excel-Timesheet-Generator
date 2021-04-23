import { Style } from "../classes/Style";
import { CommonCell } from "./types";

export function styleTableRow({
  row,
  cellStyles,
}: {
  row: CommonCell[];
  cellStyles: Style[];
}) {
  for (let i = 0; i < row.length; i++) {
    for (const cellStyle of cellStyles) {
      row[i].styles.push(cellStyle);
    }
  }
}
