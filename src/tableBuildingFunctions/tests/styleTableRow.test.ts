import { styleTableRow } from "../index";
import { makeBoldCellTextStyle, makeYellowBackgroundStyle } from "../../constants/styleConstants";
import { CommonCell } from "../types";

let actualRow: CommonCell[];

beforeEach(() => {
  actualRow = [
    {
      point: {
        column: 1,
        row: 1,
      },
      value: "a",
      styles: [],
    },
  ];
});

test("use no styles for row, expect zero changes", () => {
  const expectedRow: CommonCell[] = [
    {
      point: {
        column: 1,
        row: 1,
      },
      value: "a",
      styles: [],
    },
  ];

  styleTableRow({
    row: actualRow,
    cellStyles: [],
  });

  expect(actualRow).toEqual(expectedRow);
});

test("use bold text + yellow background styles for row, expect changes to be applied", () => {
  const expectedRow: CommonCell[] = [
    {
      point: {
        column: 1,
        row: 1,
      },
      value: "a",
      styles: [makeYellowBackgroundStyle(), makeBoldCellTextStyle()],
    },
  ];

  styleTableRow({
    row: actualRow,
    cellStyles: [makeYellowBackgroundStyle(), makeBoldCellTextStyle()],
  });

  expect(actualRow).toEqual(expectedRow);
});
