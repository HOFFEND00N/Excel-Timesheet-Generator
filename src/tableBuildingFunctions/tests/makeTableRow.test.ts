import { makeTableRow } from "../index";
import { CommonCell } from "../types";

test("pass empty values, expect empty array", () => {
  const expectedRow: CommonCell[] = [];

  const actualRow = makeTableRow({
    startPoint: { column: 1, row: 1 },
    values: [],
  });

  expect(actualRow).toEqual(expectedRow);
});

test("pass two value, expect one row with two values", () => {
  const expectedRow: CommonCell[] = [
    { point: { column: 1, row: 1 }, value: "a", styles: [] },
    { point: { column: 2, row: 1 }, value: "abs", styles: [] },
  ];

  const actualRow = makeTableRow({
    startPoint: { column: 1, row: 1 },
    values: ["a", "abs"],
  });

  expect(actualRow).toEqual(expectedRow);
});
