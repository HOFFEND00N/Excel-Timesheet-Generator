import { makeMonthRows } from "../src/tableBuildingFunctions";
import { CommonCell } from "../src/tableBuildingFunctions/types";
import { getMonthRowsForTests } from "./mockedDataForTests";

test("make date section of table + header, expect current month + year + header", () => {
  const currentDate: Date = new Date("2020-05-11");

  const expectedTable: CommonCell[] = [];
  expectedTable.push(...getMonthRowsForTests());

  const actualTable = makeMonthRows(currentDate);

  expect(actualTable).toEqual(expectedTable);
});
