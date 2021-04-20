import { TableCell } from "../classes/TableCell";

export function addTableRowToTable(row: TableCell[], table: TableCell[]) {
  for (const tableCell of row) {
    table.push(tableCell);
  }
}
