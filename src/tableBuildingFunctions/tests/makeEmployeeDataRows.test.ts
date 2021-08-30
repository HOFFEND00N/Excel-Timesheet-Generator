import { makeEmployeeDataRows } from "../index";
import { TABLE_HEADERS } from "../../constants/constant";
import { getConfigForTests } from "../../../tests/mockedDataForTests";

test("make two dimensional array from parsed json, json file consist of predefined table values, expect table values", async () => {
  const expectedTable = [
    [651, "NO", "Confirmit", "Studio", "Matrosova Marianna", "task 2", "", 160],
    [651, "NO", "Confirmit", "Studio", "Karaseva Svetlana", "task 1 task 3", "", 116],
    [651, "NO", "Confirmit", "Studio", "Molotkova Maria", "epic task 1", "", 112],
  ];
  const config = getConfigForTests();

  const actualTable = await makeEmployeeDataRows({
    config,
    headers: TABLE_HEADERS,
    nonWorkingHoursByEmployeesUsername: {
      MolotkovaM: 8,
      KarasevaS: 24,
    },
    workingHoursByEmployeesUsername: {
      MolotkovaM: 120,
      KarasevaS: 140,
      MatrosovaM: 160,
    },
    userTasksByEmployeeUsername: {
      MatrosovaM: ["task 2"],
      KarasevaS: ["task 1", "task 3"],
      MolotkovaM: ["epic task 1"],
    },
  });

  expect(actualTable).toEqual(expectedTable);
});
