import { CommonValue } from "../types";
import { makeEmployeeDataRow } from "../index";
import { TABLE_HEADERS } from "../../constants/constant";
import { getConfigForTests } from "../../../tests/mockedDataForTests";

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
    config: getConfigForTests(),
    employee: { lastName: "Karaseva", firstName: "Svetlana", jiraUsername: "KarasevaS" },
    userTasksByEmployeeUsername: { KarasevaS: ["task 1 task 3"] },
    nonWorkingHoursByEmployeesUsername: { KarasevaS: 8 },
    workingHoursPerMonth: 120,
  });

  expect(actualTableRow).toEqual(expectedTableRow);
});

test("pass data for one row, but there is no non working hours", () => {
  const expectedTableRow: CommonValue[] = [
    651,
    "NO",
    "Confirmit",
    "Studio",
    "Karaseva Svetlana",
    "task 1 task 3",
    "",
    120,
  ];

  const actualTableRow = makeEmployeeDataRow({
    headers: TABLE_HEADERS,
    config: getConfigForTests(),
    employee: { lastName: "Karaseva", firstName: "Svetlana", jiraUsername: "KarasevaS" },
    userTasksByEmployeeUsername: { KarasevaS: ["task 1 task 3"] },
    nonWorkingHoursByEmployeesUsername: {},
    workingHoursPerMonth: 120,
  });

  expect(actualTableRow).toEqual(expectedTableRow);
});
