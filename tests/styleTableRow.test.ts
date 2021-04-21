import { TableCell } from "../src/classes/TableCell";
import { Point } from "../src/classes/Point";
import { styleTableRow } from "../src/tableBuildingFunctions/styleTableRow";
import {
  makeBoldCellTextStyle,
  makeYellowBackgroundStyle,
} from "../src/constants/styleConstants";

test("use no styles for row, expect zero changes", () => {
  const expectedRow: Array<TableCell> = [
    new TableCell(new Point(1, 1), "a", []),
  ];
  const actualRow: Array<TableCell> = [new TableCell(new Point(1, 1), "a", [])];

  styleTableRow({
    row: actualRow,
    cellStyles: [],
  });

  expect(actualRow).toEqual(expectedRow);
});

test("use bold text + yellow background styles for row, expect changes to be applied", () => {
  const expectedRow: Array<TableCell> = [
    new TableCell(new Point(1, 1), "a", [
      makeYellowBackgroundStyle(),
      makeBoldCellTextStyle(),
    ]),
  ];
  const actualRow: Array<TableCell> = [new TableCell(new Point(1, 1), "a", [])];

  styleTableRow({
    row: actualRow,
    cellStyles: [makeYellowBackgroundStyle(), makeBoldCellTextStyle()],
  });

  expect(actualRow).toEqual(expectedRow);
});
