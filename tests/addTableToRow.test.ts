import { TableCell } from "../build/classes/TableCell";
import { addTableRowToTable } from "../build/tableBuildingFunctions/addTableToRow";
import { Point } from "../build/classes/Point";
import { makeBoldCellTextStyle } from "../build/constants/styleConstants";

test("add empty row, expect empty table", () => {
  let row: Array<TableCell> = [];
  let actualTable: Array<TableCell> = [];
  let expectedTable: Array<TableCell> = [];

  addTableRowToTable(row, actualTable);

  expect(actualTable).toEqual(expectedTable);
});

test("add empty row, expect the same table", () => {
  let row: Array<TableCell> = [];
  let actualTable: Array<TableCell> = [new TableCell(new Point(1, 1), "a", [])];
  let expectedTable: Array<TableCell> = [
    new TableCell(new Point(1, 1), "a", []),
  ];

  addTableRowToTable(row, actualTable);

  expect(actualTable).toEqual(expectedTable);
});

test("add one row, expect two rows", () => {
  let row: Array<TableCell> = [
    new TableCell(new Point(2, 2), "asd", [makeBoldCellTextStyle()]),
  ];
  let actualTable: Array<TableCell> = [new TableCell(new Point(1, 1), "a", [])];
  let expectedTable: Array<TableCell> = [
    new TableCell(new Point(1, 1), "a", []),
    new TableCell(new Point(2, 2), "asd", [makeBoldCellTextStyle()]),
  ];

  addTableRowToTable(row, actualTable);

  expect(actualTable).toEqual(expectedTable);
});
