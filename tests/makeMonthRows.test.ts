import { makeMonthRows } from "../src/tableBuildingFunctions/makeMonthRows";
import { CommonCell } from "../src/tableBuildingFunctions/types";
import { getMonthRowsForTests } from "./mockedDataForTests";

test("make date section of table + header, expect current month + year + header", () => {
  const currentDate: Date = new Date();

  const expectedTable: CommonCell[] = [];
  expectedTable.push(...getMonthRowsForTests(currentDate));

  const actualTable = makeMonthRows(currentDate);

  expect(actualTable).toEqual(expectedTable);
});
