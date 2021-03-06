import { CommonValue } from "../../types";
import { getNonWorkingHoursRows } from "../../index";
import { ITeamConfig } from "../../../models/ITeamConfig";

test("pass empty array, expect to return zero rows", async () => {
  const expectedNonWorkingHoursRows: CommonValue[][] = [];
  const config: ITeamConfig = {
    unit: 651,
    companyCode: "NO",
    product: "Confirmit",
    project: "Studio",
    employees: [],
    teamLead: { lastName: "Molotkova", firstName: "Maria", jiraUsername: "MolotkovaM" },
  };

  const actualNonWorkingHoursRows = await getNonWorkingHoursRows(config, []);

  expect(actualNonWorkingHoursRows).toEqual(expectedNonWorkingHoursRows);
});

test("pass one non working hours row, expect to return zero non working rows, because received row contains info about unsuitable employee", async () => {
  const expectedNonWorkingHoursRows: CommonValue[][] = [];
  const config: ITeamConfig = {
    unit: 651,
    companyCode: "NO",
    product: "Confirmit",
    project: "Studio",
    employees: [
      {
        lastName: "Karaseva",
        firstName: "Svetlana",
        jiraUsername: "KarasevaS",
      },
    ],
    teamLead: { lastName: "Molotkova", firstName: "Maria", jiraUsername: "MolotkovaM" },
  };

  const actualNonWorkingHoursRows = await getNonWorkingHoursRows(config, [
    ["100", "RU", "DaysOff", "Sick1DQ", "Matrosova Marianna", "25.01.2021", "", "8"],
  ]);

  expect(actualNonWorkingHoursRows).toEqual(expectedNonWorkingHoursRows);
});

test("pass one non working hours row, expect to return one non working rows, because received row contains info about suitable employee", async () => {
  const expectedNonWorkingHoursRows: CommonValue[][] = [
    [100, "RU", "DaysOff", "Sick1DQ", "Karaseva Svetlana", "25.01.2021", "", 8],
  ];
  const config: ITeamConfig = {
    unit: 651,
    companyCode: "NO",
    product: "Confirmit",
    project: "Studio",
    employees: [
      {
        lastName: "Karaseva",
        firstName: "Svetlana",
        jiraUsername: "KarasevaS",
      },
    ],
    teamLead: { lastName: "Molotkova", firstName: "Maria", jiraUsername: "MolotkovaM" },
  };

  const actualNonWorkingHoursRows = await getNonWorkingHoursRows(config, [
    ["100", "RU", "DaysOff", "Sick1DQ", "Karaseva Svetlana", "25.01.2021", "", "8"],
  ]);

  expect(actualNonWorkingHoursRows).toEqual(expectedNonWorkingHoursRows);
});

test("pass two non working hours row, expect to return one non working rows, because received one row contains info about suitable employee and one row contains unsuitable info about employee", async () => {
  const expectedNonWorkingHoursRows: CommonValue[][] = [
    [100, "RU", "DaysOff", "Sick1DQ", "Molotkova Maria", "25.01.2021", "", 8],
    [200, "EU", "DaysOff", "Sick1DQ", "Matrosova Marianna", "24.01.2021", "", 6],
    [100, "EU", "DaysOff", "Sick1DQ", "Karaseva Svetlana", "14.01.2021", "", 12],
  ];
  const config: ITeamConfig = {
    unit: 651,
    companyCode: "NO",
    product: "Confirmit",
    project: "Studio",
    employees: [
      {
        lastName: "Matrosova",
        firstName: "Marianna",
        jiraUsername: "MatrosovaM",
      },
      {
        lastName: "Karaseva",
        firstName: "Svetlana",
        jiraUsername: "KarasevaS",
      },
    ],
    teamLead: { lastName: "Molotkova", firstName: "Maria", jiraUsername: "MolotkovaM" },
  };

  const actualNonWorkingHoursRows = await getNonWorkingHoursRows(config, [
    ["100", "RU", "DaysOff", "Sick1DQ", "Molotkova Maria", "25.01.2021", "", "8"],
    ["200", "EU", "DaysOff", "Sick1DQ", "Matrosova Marianna", "24.01.2021", "", "6"],
    ["100", "EU", "DaysOff", "Sick1DQ", "Karaseva Svetlana", "14.01.2021", "", "12"],
  ]);

  expect(actualNonWorkingHoursRows).toEqual(expectedNonWorkingHoursRows);
});
