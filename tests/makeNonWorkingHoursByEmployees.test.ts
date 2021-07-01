import { makeNonWorkingHoursByEmployeesUserName } from "../src/tableBuildingFunctions/makeNonWorkingHoursByEmployeesUserName";
import { HoursByEmployees } from "../src/tableBuildingFunctions/types";
import { getTableDataForTests } from "./mockedDataForTests";

test("pass zero non working hours rows, expect to return empty map", () => {
  const expectedNonWorkingHoursByEmployees: HoursByEmployees = {};

  const actualNonWorkingHoursByEmployees = makeNonWorkingHoursByEmployeesUserName(
    {
      employeeColumn: 4,
      manHoursColumn: 7,
      nonWorkingHoursRows: [],
      tableData: getTableDataForTests(),
    }
  );

  expect(actualNonWorkingHoursByEmployees).toEqual(
    expectedNonWorkingHoursByEmployees
  );
});

test("pass one non working hours row, expect to return map with one element", () => {
  const expectedNonWorkingHoursByEmployees: HoursByEmployees = {
    MolotkovaM: 24,
  };

  const actualNonWorkingHoursByEmployees = makeNonWorkingHoursByEmployeesUserName(
    {
      employeeColumn: 4,
      manHoursColumn: 7,
      nonWorkingHoursRows: [
        [
          651,
          "RU",
          "DaysOff",
          "Holidays",
          "Molotkova Maria",
          "22.01.2021-26.01.2021",
          "",
          24,
        ],
      ],
      tableData: getTableDataForTests(),
    }
  );

  expect(actualNonWorkingHoursByEmployees).toEqual(
    expectedNonWorkingHoursByEmployees
  );
});

test("pass two non working hours row with two different employees, expect to return map with two element", () => {
  const expectedNonWorkingHoursByEmployees: HoursByEmployees = {
    MolotkovaM: 24,
    MatrosovaM: 8,
  };

  const actualNonWorkingHoursByEmployees = makeNonWorkingHoursByEmployeesUserName(
    {
      employeeColumn: 4,
      manHoursColumn: 7,
      nonWorkingHoursRows: [
        [
          651,
          "RU",
          "DaysOff",
          "Holidays",
          "Molotkova Maria",
          "22.01.2021-26.01.2021",
          "",
          24,
        ],
        [
          651,
          "RU",
          "DaysOff",
          "Sick1DQ",
          "Matrosova Marianna",
          "23.01.2021",
          "",
          8,
        ],
      ],
      tableData: getTableDataForTests(),
    }
  );

  expect(actualNonWorkingHoursByEmployees).toEqual(
    expectedNonWorkingHoursByEmployees
  );
});

test("pass three non working hours row with two rows for one employee and the rest row for the other employee, expect to return map with two element", () => {
  const expectedNonWorkingHoursByEmployees: HoursByEmployees = {
    MolotkovaM: 32,
    MatrosovaM: 8,
  };

  const actualNonWorkingHoursByEmployees = makeNonWorkingHoursByEmployeesUserName(
    {
      employeeColumn: 4,
      manHoursColumn: 7,
      nonWorkingHoursRows: [
        [
          651,
          "RU",
          "DaysOff",
          "Holidays",
          "Molotkova Maria",
          "22.01.2021-26.01.2021",
          "",
          24,
        ],
        [
          651,
          "RU",
          "DaysOff",
          "Sick1DQ",
          "Matrosova Marianna",
          "23.01.2021",
          "",
          8,
        ],
        [
          651,
          "RU",
          "DaysOff",
          "Sick1DQ",
          "Molotkova Maria",
          "27.01.2021",
          "",
          8,
        ],
      ],
      tableData: getTableDataForTests(),
    }
  );

  expect(actualNonWorkingHoursByEmployees).toEqual(
    expectedNonWorkingHoursByEmployees
  );
});
