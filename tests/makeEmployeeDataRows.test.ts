import { makeEmployeeDataRows } from "../src/tableBuildingFunctions/makeEmployeeDataRows";
import { getTableHeaders } from "../src/constants/constant";
import {
  getFetchUserTasksForTests,
  getTableDataForTests,
} from "./mockedDataForTests";

test("make two dimensional array from parsed json, json file consist of predefined table values, expect table values", async () => {
  const expectedTable = [
    [
      651,
      "NO",
      "Confirmit",
      "Studio",
      "Molotkova Maria",
      "task 1 task 3",
      "",
      "",
    ],
    [651, "NO", "Confirmit", "Studio", "Matrosova Marianna", "task 2", "", ""],
  ];
  const tableData = getTableDataForTests();

  const actualTable = await makeEmployeeDataRows({
    tableData,
    headers: getTableHeaders(),
    getCredentials: () => Promise.resolve({ login: "", password: "" }),
    fetchUserTasks: getFetchUserTasksForTests(),
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
  });

  expect(actualTable).toEqual(expectedTable);
});
