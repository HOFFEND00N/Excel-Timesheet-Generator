import { TableCell } from "../src/classes/TableCell";
import { styleTableRow } from "../src/tableBuildingFunctions/styleTableRow";
import {
  makeBoldCellTextStyle,
  makeYellowBackgroundStyle,
} from "../src/constants/styleConstants";
import { CommonCell } from "../src/tableBuildingFunctions/types";

let actualRow: CommonCell[];

beforeEach(() => {
  actualRow = [
    new TableCell({
      point: {
        column: 1,
        row: 1,
      },
      value: "a",
      styles: [],
    }),
  ];
});

test("use no styles for row, expect zero changes", () => {
  const expectedRow: CommonCell[] = [
    new TableCell({
      point: {
        column: 1,
        row: 1,
      },
      value: "a",
      styles: [],
    }),
  ];

  styleTableRow({
    row: actualRow,
    cellStyles: [],
  });

  expect(actualRow).toEqual(expectedRow);
});

test("use bold text + yellow background styles for row, expect changes to be applied", () => {
  const expectedRow: CommonCell[] = [
    new TableCell({
      point: {
        column: 1,
        row: 1,
      },
      value: "a",
      styles: [makeYellowBackgroundStyle(), makeBoldCellTextStyle()],
    }),
  ];

  styleTableRow({
    row: actualRow,
    cellStyles: [makeYellowBackgroundStyle(), makeBoldCellTextStyle()],
  });

  expect(actualRow).toEqual(expectedRow);
});
