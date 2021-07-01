import { CommonValue } from "../src/tableBuildingFunctions/types";
import { makeEmployeeDataRow } from "../src/tableBuildingFunctions/makeEmployeeDataRow";
import { TABLE_HEADERS } from "../src/constants/constant";
import { getTableDataForTests } from "./mockedDataForTests";

test("pass data for one row", () => {
  const expectedTableRow: CommonValue[] = [
    651,
    "NO",
    "Confirmit",
    "Studio",
    "Karaseva Svetlana",
    "task 1 task 3",
    "",
    112,
  ];

  const actualTableRow = makeEmployeeDataRow({
    headers: TABLE_HEADERS,
    tableData: getTableDataForTests(),
    employee: { name: "Karaseva Svetlana", jiraUsername: "KarasevaS" },
    userTasksByEmployeeUsername: { KarasevaS: "task 1 task 3" },
    nonWorkingHoursByEmployeesUsername: { KarasevaS: 8 },
    workingHoursPerMonth: 120,
  });

  expect(actualTableRow).toEqual(expectedTableRow);
});
