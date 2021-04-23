import { CommonCell } from "./types";

export function addTableRowToTable(row: CommonCell[], table: CommonCell[]) {
  for (const tableCell of row) {
    table.push(tableCell);
  }
}
