import { makeWorkingHoursByEmployees } from "../src/tableBuildingFunctions/makeWorkingHoursByEmployees";
import { HoursByEmployees } from "../src/tableBuildingFunctions/types";

test("pass zero non working hours, expect to return employees with same rate, total employees count = 2", () => {
  const expectedWorkingHoursByEmployees: HoursByEmployees = {
    "Molotkova Maria": 120,
    "Matrosova Marianna": 120,
  };

  const employeesNames = ["Molotkova Maria", "Matrosova Marianna"];

  const actualWorkingHoursByEmployees = makeWorkingHoursByEmployees({
    nonWorkingHoursByEmployees: {},
    workingHoursPerMonth: 120,
    employeesNames,
  });

  expect(actualWorkingHoursByEmployees).toEqual(
    expectedWorkingHoursByEmployees
  );
});

test("pass zero employees, expect to return empty Map, total employees count = 0", () => {
  const expectedWorkingHoursByEmployees: HoursByEmployees = {};

  const employeesNames = [];

  const actualWorkingHoursByEmployees = makeWorkingHoursByEmployees({
    nonWorkingHoursByEmployees: {},
    workingHoursPerMonth: 120,
    employeesNames,
  });

  expect(actualWorkingHoursByEmployees).toEqual(
    expectedWorkingHoursByEmployees
  );
});

test("pass non working hours for one employee, expect to return employees with same different rate, total employees count = 2", () => {
  const expectedWorkingHoursByEmployees: HoursByEmployees = {
    "Molotkova Maria": 120,
    "Matrosova Marianna": 100,
  };

  const employeesNames = ["Molotkova Maria", "Matrosova Marianna"];

  const actualWorkingHoursByEmployees = makeWorkingHoursByEmployees({
    nonWorkingHoursByEmployees: { "Matrosova Marianna": 20 },
    workingHoursPerMonth: 120,
    employeesNames,
  });

  expect(actualWorkingHoursByEmployees).toEqual(
    expectedWorkingHoursByEmployees
  );
});
