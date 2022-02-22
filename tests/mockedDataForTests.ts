import { IPoint } from "../src/models/IPoint";
import { MONTHLY_TIMESHEET_HEADER, START_MONTH_HEADER_POINT } from "../src/constants/constant";
import { CommonCell } from "../src/tableBuildingFunctions/types";
import {
  HorizontalAlignTextWays,
  makeBoldCellTextStyle,
  makeDefaultTextStyle,
  makeStyleHorizontalAlignText,
  makeYellowBackgroundStyle,
} from "../src/constants/styleConstants";
import { ITeamConfig } from "../src/models/ITeamConfig";

export function getConfigForTests(): ITeamConfig {
  return {
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
    teamLead: {
      lastName: "Molotkova",
      firstName: "Maria",
      jiraUsername: "MolotkovaM",
    },
    fileNameTemplate: "",
  };
}

export function getMonthRowsForTests() {
  const startMonthHeaderPoint: IPoint = START_MONTH_HEADER_POINT;
  const monthRows: CommonCell[] = [];
  monthRows.push({
    point: startMonthHeaderPoint,
    value: MONTHLY_TIMESHEET_HEADER,
    styles: [makeBoldCellTextStyle(), makeDefaultTextStyle()],
  });

  monthRows.push({
    point: {
      column: startMonthHeaderPoint.column,
      row: startMonthHeaderPoint.row + 1,
    },
    value: "May",
    styles: [
      makeYellowBackgroundStyle(),
      makeStyleHorizontalAlignText(HorizontalAlignTextWays.right),
      makeDefaultTextStyle(),
    ],
  });
  monthRows.push({
    point: {
      column: startMonthHeaderPoint.column + 1,
      row: startMonthHeaderPoint.row + 1,
    },
    value: 2020,
    styles: [
      makeYellowBackgroundStyle(),
      makeStyleHorizontalAlignText(HorizontalAlignTextWays.left),
      makeDefaultTextStyle(),
    ],
  });
  return monthRows;
}
