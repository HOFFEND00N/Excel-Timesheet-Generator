import { CommonValue } from "../src/tableBuildingFunctions/types";
import { getNonWorkingHoursRows } from "../src/tableBuildingFunctions/getNonWorkingHoursRows";
import { TableData } from "../src/classes/TableData";

test("pass empty array, expect to return zero rows", async () => {
  const expectedNonWorkingHoursRows: CommonValue[][] = [];
  const tableData: TableData = {
    unit: 651,
    companyCode: "NO",
    companyName: "Confirmit",
    project: "Studio",
    employees: [],
  };

  const actualNonWorkingHoursRows = await getNonWorkingHoursRows(
    tableData,
    () => Promise.resolve([])
  );

  expect(actualNonWorkingHoursRows).toEqual(expectedNonWorkingHoursRows);
});

test("pass one non working hours row, expect to return zero non working rows, because received row contains info about unsuitable employee", async () => {
  const expectedNonWorkingHoursRows: CommonValue[][] = [];
  const tableData: TableData = {
    unit: 651,
    companyCode: "NO",
    companyName: "Confirmit",
    project: "Studio",
    employees: [
      {
        name: "Volyakova Kristina",
        jiraUsername: "KristinaZ",
      },
    ],
  };

  const actualNonWorkingHoursRows = await getNonWorkingHoursRows(
    tableData,
    () =>
      Promise.resolve([
        [
          "100",
          "RU",
          "DaysOff",
          "Sick1DQ",
          "Khomutova Galina",
          "25.01.2021",
          "",
          "8",
        ],
      ])
  );

  expect(actualNonWorkingHoursRows).toEqual(expectedNonWorkingHoursRows);
});

test("pass one non working hours row, expect to return one non working rows, because received row contains info about suitable employee", async () => {
  const expectedNonWorkingHoursRows: CommonValue[][] = [
    [
      100,
      "RU",
      "DaysOff",
      "Sick1DQ",
      "Volyakova Kristina",
      "25.01.2021",
      "",
      8,
    ],
  ];
  const tableData: TableData = {
    unit: 651,
    companyCode: "NO",
    companyName: "Confirmit",
    project: "Studio",
    employees: [
      {
        name: "Volyakova Kristina",
        jiraUsername: "KristinaZ",
      },
    ],
  };

  const actualNonWorkingHoursRows = await getNonWorkingHoursRows(
    tableData,
    () =>
      Promise.resolve([
        [
          "100",
          "RU",
          "DaysOff",
          "Sick1DQ",
          "Volyakova Kristina",
          "25.01.2021",
          "",
          "8",
        ],
      ])
  );

  expect(actualNonWorkingHoursRows).toEqual(expectedNonWorkingHoursRows);
});

test("pass two non working hours row, expect to return one non working rows, because received one row contains info about suitable employee and one row contains unsuitable info about employee", async () => {
  const expectedNonWorkingHoursRows: CommonValue[][] = [
    [
      100,
      "RU",
      "DaysOff",
      "Sick1DQ",
      "Volyakova Kristina",
      "25.01.2021",
      "",
      8,
    ],
  ];
  const tableData: TableData = {
    unit: 651,
    companyCode: "NO",
    companyName: "Confirmit",
    project: "Studio",
    employees: [
      {
        name: "Volyakova Kristina",
        jiraUsername: "KristinaZ",
      },
    ],
  };

  const actualNonWorkingHoursRows = await getNonWorkingHoursRows(
    tableData,
    () =>
      Promise.resolve([
        [
          "100",
          "RU",
          "DaysOff",
          "Sick1DQ",
          "Volyakova Kristina",
          "25.01.2021",
          "",
          "8",
        ],
        [
          "200",
          "EU",
          "DaysOff",
          "Sick1DQ",
          "Karasev Daniil",
          "25.01.1999",
          "",
          "6",
        ],
      ])
  );

  expect(actualNonWorkingHoursRows).toEqual(expectedNonWorkingHoursRows);
});
