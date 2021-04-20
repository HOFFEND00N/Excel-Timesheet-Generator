import { TableCell } from "../classes/TableCell";
import { Style } from "../classes/Style";

export function styleTableRow({
  row,
  cellStyles,
}: {
  row: TableCell[];
  cellStyles: Style[];
}) {
  for (let i: number = 0; i < row.length; i++) {
    for (const cellStyle of cellStyles) {
      row[i].styles.push(cellStyle);
    }
  }
}
