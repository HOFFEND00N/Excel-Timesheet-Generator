import { CommonCell, CommonValue, NumberValue, StringValue } from "../types";
import { START_TABLE_POINT } from "../../constants/constant";
import { ITableCell } from "../../models/ITableCell";
import {
  HorizontalAlignTextWays,
  makeCellBorderStyle,
  makeDefaultTextStyle,
  makeNumberFormat,
  makeStyleHorizontalAlignText,
} from "../../constants/styleConstants";
import { makeTeamTable } from "../makeTeamTable";
import { getUserTasks } from "../jiraHelpers";
import { IPoint } from "../../models/IPoint";

jest.mock("../jiraHelpers/getUserTasks");

test("should make table for 2 teams", async () => {
  (getUserTasks as jest.Mock)
    .mockReturnValueOnce({ MatrosovaM: ["task 2"], KarasevaS: ["task 1", "task 3"] })
    .mockReturnValueOnce({ KolobkovaE: ["task 4"], SvetlovaO: ["task 5", "task 6"] });
  const expectedTable: CommonCell[] = [];

  const expectedTableRows: CommonValue[][] = [
    [651, "NO", "Confirmit", "Studio", "Karaseva Svetlana", "task 1 task 3", "", 160],
    [651, "NO", "Confirmit", "Studio", "Matrosova Marianna", "task 2", "", 112],
    [651, "RU", "Confirmit", "DaysOff", "Matrosova Marianna", "25.01.2021", "", 8],
    [606, "NO", "Confirmit", "HUB", "Svetlova Olga", "task 5 task 6", "", 120],
    [606, "NO", "Confirmit", "HUB", "Kolobkova Ekaterina", "task 4", "", 152],
    [606, "RU", "Confirmit", "HUB", "Kolobkova Ekaterina", "25.01.2021", "", 8],
  ];

  const startPoint: IPoint = { column: START_TABLE_POINT.column, row: START_TABLE_POINT.row };
  for (let i = 0; i < expectedTableRows.length; i++) {
    const expectedTableRow = expectedTableRows[i];
    //add empty line between teams
    if (i === 3) {
      startPoint.row++;
    }
    for (let j = 0; j < expectedTableRow.length; j++) {
      const value = expectedTableRow[j];
      const tableCell: CommonCell = <ITableCell<StringValue> | ITableCell<NumberValue>>{
        point: { column: startPoint.column + j, row: startPoint.row + i + 1 },
        value: value,
        styles: [makeCellBorderStyle(), makeDefaultTextStyle()],
      };
      if (j === 0 || j === 1) {
        tableCell.styles.unshift(makeStyleHorizontalAlignText(HorizontalAlignTextWays.center));
      }
      if (j === expectedTableRow.length - 1) {
        tableCell.styles.unshift(makeNumberFormat("0.00"));
      }
      expectedTable.push(tableCell);
    }
  }

  const actualTable = await makeTeamTable({
    login: "",
    password: "",
    nonWorkingHoursFile: [
      ["651", "RU", "Confirmit", "DaysOff", "Matrosova Marianna", "25.01.2021", "", "8"],
      ["606", "RU", "Confirmit", "HUB", "Kolobkova Ekaterina", "25.01.2021", "", "8"],
    ],
    workingHoursByEmployeesUsernameForEachTeam: [
      {
        MatrosovaM: 120,
        KarasevaS: 160,
      },
      {
        KolobkovaE: 160,
        SvetlovaO: 120,
      },
    ],
    config: {
      workingHoursPerMonth: 160,
      jiraTaskQuery: "",
      fileNameTemplate: "",
      teams: [
        {
          unit: 651,
          companyCode: "NO",
          product: "Confirmit",
          project: "Studio",
          teamLead: {
            lastName: "Matrosova",
            firstName: "Marianna",
            jiraUsername: "MatrosovaM",
            workingHoursPerMonth: 120,
          },
          employees: [
            {
              lastName: "Karaseva",
              firstName: "Svetlana",
              jiraUsername: "KarasevaS",
            },
          ],
        },
        {
          unit: 606,
          companyCode: "NO",
          product: "Confirmit",
          project: "HUB",
          teamLead: {
            lastName: "Kolobkova",
            firstName: "Ekaterina",
            jiraUsername: "KolobkovaE",
          },
          employees: [
            {
              lastName: "Svetlova",
              firstName: "Olga",
              jiraUsername: "SvetlovaO",
              workingHoursPerMonth: 120,
            },
          ],
        },
      ],
    },
  });

  expect(actualTable).toEqual(expectedTable);
});
