import { makeEmployeeDataRows } from "../index";
import { TABLE_HEADERS } from "../../constants/constant";
import { getFetchUserTasksForTests, getTableDataForTests } from "../../../tests/mockedDataForTests";

test("make two dimensional array from parsed json, json file consist of predefined table values, expect table values", async () => {
  const expectedTable = [
    [651, "NO", "Confirmit", "Studio", "Matrosova Marianna", "task 2", "", 160],
    [651, "NO", "Confirmit", "Studio", "Karaseva Svetlana", "task 1 task 3", "", 116],
    [651, "NO", "Confirmit", "Studio", "Molotkova Maria", "epic task 1", "", 112],
  ];
  const tableData = getTableDataForTests();

  const actualTable = await makeEmployeeDataRows({
    tableData,
    headers: TABLE_HEADERS,
    getCredentials: () => Promise.resolve({ login: "", password: "" }),
    fetchUserTasks: getFetchUserTasksForTests(),
    nonWorkingHoursByEmployeesUsername: {
      MolotkovaM: 8,
      KarasevaS: 24,
    },
    isJiraCredentialsCorrect: () => Promise.resolve(true),
    workingHoursByEmployeesUsername: {
      MolotkovaM: 120,
      KarasevaS: 140,
      MatrosovaM: 160,
    },
  });

  expect(actualTable).toEqual(expectedTable);
});

test("pass wrong credentials, expect to throw exception", async () => {
  const tableData = getTableDataForTests();

  const actualTable = async () => {
    await makeEmployeeDataRows({
      tableData,
      headers: TABLE_HEADERS,
      getCredentials: () => Promise.resolve({ login: "", password: "" }),
      fetchUserTasks: getFetchUserTasksForTests(),
      nonWorkingHoursByEmployeesUsername: {},
      isJiraCredentialsCorrect: () => Promise.resolve(false),
      workingHoursByEmployeesUsername: {
        MolotkovaM: 120,
      },
    });
  };

  await expect(actualTable()).rejects.toThrow("Wrong credentials. Please try again");
});
