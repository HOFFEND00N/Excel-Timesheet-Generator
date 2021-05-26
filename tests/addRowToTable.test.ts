import { addRowToTable } from "../src/tableBuildingFunctions/addRowToTable";
import { makeBoldCellTextStyle } from "../src/constants/styleConstants";
import { CommonCell } from "../src/tableBuildingFunctions/types";

test("add empty row to empty table, expect empty table", () => {
  const row: CommonCell[] = [];
  const actualTable: CommonCell[] = [];
  const expectedTable: CommonCell[] = [];

  addRowToTable(row, actualTable);

  expect(actualTable).toEqual(expectedTable);
});

test("add empty row to table with one row, expect the same table", () => {
  const row: CommonCell[] = [];
  const actualTable: CommonCell[] = [
    { point: { column: 1, row: 1 }, value: "a", styles: [] },
  ];
  const expectedTable: CommonCell[] = [
    { point: { column: 1, row: 1 }, value: "a", styles: [] },
  ];

  addRowToTable(row, actualTable);

  expect(actualTable).toEqual(expectedTable);
});

test("add one row to table with one row, expect two rows", () => {
  const row: CommonCell[] = [
    {
      point: { column: 2, row: 2 },
      value: "asd",
      styles: [makeBoldCellTextStyle()],
    },
  ];
  const actualTable: CommonCell[] = [
    { point: { column: 1, row: 1 }, value: "a", styles: [] },
  ];
  const expectedTable: CommonCell[] = [
    { point: { column: 1, row: 1 }, value: "a", styles: [] },
    {
      point: { column: 2, row: 2 },
      value: "asd",
      styles: [makeBoldCellTextStyle()],
    },
  ];

  addRowToTable(row, actualTable);

  expect(actualTable).toEqual(expectedTable);
});
