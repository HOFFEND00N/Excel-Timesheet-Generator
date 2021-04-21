import { TableCell } from "../src/classes/TableCell";
import { makeTableRow } from "../src/tableBuildingFunctions/makeTableRow";
import { Point } from "../src/classes/Point";

test("make Table Row, pass empty values, expect empty array", () => {
  let expectedRow: Array<TableCell> = [];

  let actualRow = makeTableRow({ startPoint: new Point(1, 1), values: [] });

  expect(actualRow).toEqual(expectedRow);
});

test("make Table Row, pass one value, expect one row", () => {
  let expectedRow: Array<TableCell> = [new TableCell(new Point(1, 1), "a", [])];

  let actualRow = makeTableRow({
    startPoint: new Point(1, 1),
    values: ["a"],
  });

  expect(actualRow).toEqual(expectedRow);
});
