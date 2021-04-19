import { TableCell } from "../classes/TableCell";

export function addTableRowToTable(
  row: Array<TableCell>,
  table: Array<TableCell>
) {
  for (const tableCell of row) {
    table.push(tableCell);
  }
}
