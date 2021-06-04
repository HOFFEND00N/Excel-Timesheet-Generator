import { makeNonWorkingHoursByEmployees } from "../src/tableBuildingFunctions/makeNonWorkingHoursByEmployees";

test("pass zero non working hours rows, expect to return empty map", () => {
  const expectedNonWorkingHoursByEmployees: Map<string, number> = new Map();

  const actualNonWorkingHoursByEmployees = makeNonWorkingHoursByEmployees({
    employeeColumn: 4,
    manHoursColumn: 7,
    nonWorkingHoursRows: [],
  });

  expect(actualNonWorkingHoursByEmployees).toEqual(
    expectedNonWorkingHoursByEmployees
  );
});

test("pass one non working hours row, expect to return map with one element", () => {
  const expectedNonWorkingHoursByEmployees: Map<string, number> = new Map();
  expectedNonWorkingHoursByEmployees.set("Molotkova Maria", 24);

  const actualNonWorkingHoursByEmployees = makeNonWorkingHoursByEmployees({
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
  });

  expect(actualNonWorkingHoursByEmployees).toEqual(
    expectedNonWorkingHoursByEmployees
  );
});

test("pass two non working hours row with two different employees, expect to return map with two element", () => {
  const expectedNonWorkingHoursByEmployees: Map<string, number> = new Map();
  expectedNonWorkingHoursByEmployees.set("Molotkova Maria", 24);
  expectedNonWorkingHoursByEmployees.set("Matrosova Marianna", 8);

  const actualNonWorkingHoursByEmployees = makeNonWorkingHoursByEmployees({
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
  });

  expect(actualNonWorkingHoursByEmployees).toEqual(
    expectedNonWorkingHoursByEmployees
  );
});

test("pass three non working hours row with two rows for one employee and the rest row for the other employee, expect to return map with two element", () => {
  const expectedNonWorkingHoursByEmployees: Map<string, number> = new Map();
  expectedNonWorkingHoursByEmployees.set("Molotkova Maria", 32);
  expectedNonWorkingHoursByEmployees.set("Matrosova Marianna", 8);

  const actualNonWorkingHoursByEmployees = makeNonWorkingHoursByEmployees({
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
      [651, "RU", "DaysOff", "Sick1DQ", "Molotkova Maria", "27.01.2021", "", 8],
    ],
  });

  expect(actualNonWorkingHoursByEmployees).toEqual(
    expectedNonWorkingHoursByEmployees
  );
});
