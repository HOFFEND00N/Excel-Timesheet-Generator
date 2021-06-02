import { CommonCell } from "./types";

export function addRowToTable(row: CommonCell[], table: CommonCell[]) {
  for (const tableCell of row) {
    table.push(tableCell);
  }
}
