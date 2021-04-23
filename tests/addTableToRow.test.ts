import { TableCell } from "../src/classes/TableCell";
import { addTableRowToTable } from "../src/tableBuildingFunctions/addTableToRow";
import { makeBoldCellTextStyle } from "../src/constants/styleConstants";
import { CommonCell } from "../src/tableBuildingFunctions/types";

test("add empty row, expect empty table", () => {
  const row: CommonCell[] = [];
  const actualTable: CommonCell[] = [];
  const expectedTable: CommonCell[] = [];

  addTableRowToTable(row, actualTable);

  expect(actualTable).toEqual(expectedTable);
});

test("add empty row, expect the same table", () => {
  const row: CommonCell[] = [];
  const actualTable: CommonCell[] = [
    new TableCell({ point: { column: 1, row: 1 }, value: "a", styles: [] }),
  ];
  const expectedTable: CommonCell[] = [
    new TableCell({ point: { column: 1, row: 1 }, value: "a", styles: [] }),
  ];

  addTableRowToTable(row, actualTable);

  expect(actualTable).toEqual(expectedTable);
});

test("add one row, expect two rows", () => {
  const row: CommonCell[] = [
    new TableCell({
      point: { column: 2, row: 2 },
      value: "asd",
      styles: [makeBoldCellTextStyle()],
    }),
  ];
  const actualTable: CommonCell[] = [
    new TableCell({ point: { column: 1, row: 1 }, value: "a", styles: [] }),
  ];
  const expectedTable: CommonCell[] = [
    new TableCell({ point: { column: 1, row: 1 }, value: "a", styles: [] }),
    new TableCell({
      point: { column: 2, row: 2 },
      value: "asd",
      styles: [makeBoldCellTextStyle()],
    }),
  ];

  addTableRowToTable(row, actualTable);

  expect(actualTable).toEqual(expectedTable);
});
