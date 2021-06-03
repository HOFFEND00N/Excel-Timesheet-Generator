import { TableData } from "../src/classes/TableData";
import { FetchUserTasksArguments } from "../src/tableBuildingFunctions/makeTable";
import { Point } from "../src/classes/Point";
import {
  getMonthlyTimesheetHeader,
  getMonthNames,
  getStartMonthHeaderPoint,
} from "../src/constants/constant";
import { CommonCell } from "../src/tableBuildingFunctions/types";
import {
  HorizontalAlignTextWays,
  makeBoldCellTextStyle,
  makeDefaultTextStyle,
  makeStyleHorizontalAlignText,
  makeYellowBackgroundStyle,
} from "../src/constants/styleConstants";

export function getTableDataForTests(): TableData {
  return {
    unit: 651,
    companyCode: "NO",
    companyName: "Confirmit",
    project: "Studio",
    employees: [
      {
        name: "Molotkova Maria",
        jiraUsername: "MolotkovaM",
      },
      {
        name: "Matrosova Marianna",
        jiraUsername: "MatrosovaM",
      },
    ],
  };
}

export function getFetchUserTasksForTests(): ({
  jiraUserName,
  login,
  password,
}: FetchUserTasksArguments) => Promise<string[]> {
  return (user) => {
    const users = {
      MolotkovaM: ["task 1", "task 3"],
      MatrosovaM: ["task 2"],
    };
    return users[user.jiraUserName];
  };
}

export function getMonthRowsForTests(currentDate: Date) {
  const startMonthHeaderPoint: Point = getStartMonthHeaderPoint();
  const monthRows: CommonCell[] = [];
  monthRows.push({
    point: startMonthHeaderPoint,
    value: getMonthlyTimesheetHeader(),
    styles: [makeBoldCellTextStyle(), makeDefaultTextStyle()],
  });

  monthRows.push({
    point: {
      column: startMonthHeaderPoint.column,
      row: startMonthHeaderPoint.row + 1,
    },
    value: getMonthNames(currentDate.getMonth()),
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
    value: currentDate.getFullYear(),
    styles: [
      makeYellowBackgroundStyle(),
      makeStyleHorizontalAlignText(HorizontalAlignTextWays.left),
      makeDefaultTextStyle(),
    ],
  });
  return monthRows;
}
