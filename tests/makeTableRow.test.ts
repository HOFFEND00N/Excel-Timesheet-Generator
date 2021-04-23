import { TableCell } from "../src/classes/TableCell";
import { makeTableRow } from "../src/tableBuildingFunctions/makeTableRow";
import { CommonCell } from "../src/tableBuildingFunctions/types";

test("make Table Row, pass empty values, expect empty array", () => {
  const expectedRow: CommonCell[] = [];

  const actualRow = makeTableRow({
    startPoint: { column: 1, row: 1 },
    values: [],
  });

  expect(actualRow).toEqual(expectedRow);
});

test("make Table Row, pass one value, expect one row", () => {
  const expectedRow: CommonCell[] = [
    new TableCell({ point: { column: 1, row: 1 }, value: "a", styles: [] }),
  ];

  const actualRow = makeTableRow({
    startPoint: { column: 1, row: 1 },
    values: ["a"],
  });

  expect(actualRow).toEqual(expectedRow);
});
