import { TableCell } from "../build/classes/TableCell";
import { Point } from "../build/classes/Point";
import { styleTableRow } from "../build/tableBuildingFunctions/styleTableRow";
import {
  makeBoldCellTextStyle,
  makeYellowBackgroundStyle,
} from "../build/constants/styleConstants";

test("use no styles for row, expect zero changes", () => {
  let expectedRow: Array<TableCell> = [new TableCell(new Point(1, 1), "a", [])];
  let actualRow: Array<TableCell> = [new TableCell(new Point(1, 1), "a", [])];

  styleTableRow({
    row: actualRow,
    cellStyles: [],
  });

  expect(actualRow).toEqual(expectedRow);
});

test("use bold text + yellow background styles for row, expect changes to be applied", () => {
  let expectedRow: Array<TableCell> = [
    new TableCell(new Point(1, 1), "a", [
      makeYellowBackgroundStyle(),
      makeBoldCellTextStyle(),
    ]),
  ];
  let actualRow: Array<TableCell> = [new TableCell(new Point(1, 1), "a", [])];

  styleTableRow({
    row: actualRow,
    cellStyles: [makeYellowBackgroundStyle(), makeBoldCellTextStyle()],
  });

  expect(actualRow).toEqual(expectedRow);
});
