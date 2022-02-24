import { getMonthRowsForTests } from "../../../tests/mockedDataForTests";
import { CommonCell } from "../types";
import { START_TABLE_POINT, TABLE_HEADERS } from "../../constants/constant";
import { makeBoldCellTextStyle, makeCellBorderStyle, makeDefaultTextStyle } from "../../constants/styleConstants";
import { makeTableHeadersAndMonthRows } from "../makeTableHeadersAndMonthRows";

test("should make table headers and month rows", () => {
  const expectedTable: CommonCell[] = [];
  expectedTable.push(...getMonthRowsForTests());
  for (let i = 0; i < TABLE_HEADERS.length; i++) {
    const tableHeader = TABLE_HEADERS[i];
    expectedTable.push({
      point: { column: START_TABLE_POINT.column + i, row: START_TABLE_POINT.row },
      value: tableHeader.label,
      styles: [makeBoldCellTextStyle(), makeCellBorderStyle(), makeDefaultTextStyle()],
    });
  }

  const actualTable = makeTableHeadersAndMonthRows(new Date(2020, 4));

  expect(actualTable).toEqual(expectedTable);
});
