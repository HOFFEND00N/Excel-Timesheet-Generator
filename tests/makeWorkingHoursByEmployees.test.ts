import { makeWorkingHoursByEmployees } from "../src/tableBuildingFunctions/makeWorkingHoursByEmployees";

test("pass zero non working hours, expect to return employees with same rate, total employees count = 2", () => {
  const expectedWorkingHoursByEmployees = new Map([
    ["Molotkova Maria", 120],
    ["Matrosova Marianna", 120],
  ]);

  const employeesNames = ["Molotkova Maria", "Matrosova Marianna"];

  const actualWorkingHoursByEmployees = makeWorkingHoursByEmployees({
    nonWorkingHoursByEmployees: new Map(),
    workingHoursPerMonth: 120,
    employeesNames,
  });

  expect(actualWorkingHoursByEmployees).toEqual(
    expectedWorkingHoursByEmployees
  );
});

test("pass zero employees, expect to return empty Map, total employees count = 0", () => {
  const expectedWorkingHoursByEmployees = new Map();

  const employeesNames = [];

  const actualWorkingHoursByEmployees = makeWorkingHoursByEmployees({
    nonWorkingHoursByEmployees: new Map(),
    workingHoursPerMonth: 120,
    employeesNames,
  });

  expect(actualWorkingHoursByEmployees).toEqual(
    expectedWorkingHoursByEmployees
  );
});

test("pass non working hours for one employee, expect to return employees with same different rate, total employees count = 2", () => {
  const expectedWorkingHoursByEmployees = new Map([
    ["Molotkova Maria", 120],
    ["Matrosova Marianna", 100],
  ]);

  const employeesNames = ["Molotkova Maria", "Matrosova Marianna"];

  const actualWorkingHoursByEmployees = makeWorkingHoursByEmployees({
    nonWorkingHoursByEmployees: new Map([["Matrosova Marianna", 20]]),
    workingHoursPerMonth: 120,
    employeesNames,
  });

  expect(actualWorkingHoursByEmployees).toEqual(
    expectedWorkingHoursByEmployees
  );
});
