import { IConfig } from "../src/models/IConfig";
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

export function getConfigForTests(): IConfig {
  return {
    unit: 651,
    companyCode: "NO",
    companyName: "Confirmit",
    project: "Studio",
    employees: [
      {
        name: "Matrosova Marianna",
        jiraUsername: "MatrosovaM",
      },
      {
        name: "Karaseva Svetlana",
        jiraUsername: "KarasevaS",
      },
    ],
    teamLead: {
      name: "Molotkova Maria",
      jiraUsername: "MolotkovaM",
    },
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
