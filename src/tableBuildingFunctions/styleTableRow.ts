import { TableCell } from "../classes/TableCell";

export function styleTableRow({
  row,
  cellStyles,
}: {
  row: Array<TableCell>;
  cellStyles: Array<object>;
}) {
  for (let i: number = 0; i < row.length; i++) {
    for (const cellStyle of cellStyles) {
      row[i].styles.push(cellStyle);
    }
  }
}
