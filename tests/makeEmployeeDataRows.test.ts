import { makeEmployeeDataRows } from "../src/tableBuildingFunctions/makeEmployeeDataRows";
import {
  getFetchUserTasksForTests,
  getTableDataForTests,
} from "./mockedDataForTests";
import { TABLE_HEADERS } from "../src/constants/constant";

test("make two dimensional array from parsed json, json file consist of predefined table values, expect table values", async () => {
  const expectedTable = [
    [651, "NO", "Confirmit", "Studio", "Matrosova Marianna", "task 2", "", 120],
    [
      651,
      "NO",
      "Confirmit",
      "Studio",
      "Karaseva Svetlana",
      "task 1 task 3",
      "",
      120,
    ],
    [
      651,
      "NO",
      "Confirmit",
      "Studio",
      "Molotkova Maria",
      "epic task 1",
      "",
      112,
    ],
  ];
  const tableData = getTableDataForTests();

  const actualTable = await makeEmployeeDataRows({
    tableData,
    headers: TABLE_HEADERS,
    getCredentials: () => Promise.resolve({ login: "", password: "" }),
    fetchUserTasks: getFetchUserTasksForTests(),
    nonWorkingHoursByEmployees: {
      "Molotkova Maria": 8,
    },
    workingHoursPerMonth: 120,
  });

  expect(actualTable).toEqual(expectedTable);
});

test("make table rows values, pass empty function parameter, expect empty table", async () => {
  const expectedTable = [];

  const actualTable = await makeEmployeeDataRows({
    tableData: {
      employees: [],
      companyCode: "",
      companyName: "",
      unit: 0,
      project: "",
    },
    headers: [],
    getCredentials: () => Promise.resolve({ login: "", password: "" }),
    fetchUserTasks: () => Promise.resolve([]),
    nonWorkingHoursByEmployees: {},
    workingHoursPerMonth: 120,
  });

  expect(actualTable).toEqual(expectedTable);
});
