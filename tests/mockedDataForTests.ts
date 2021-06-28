import { TableData } from "../src/classes/TableData";
import { Point } from "../src/classes/Point";
import {
  START_MONTH_HEADER_POINT,
  MONTHLY_TIMESHEET_HEADER,
} from "../src/constants/constant";
import {
  CommonCell,
  EmployeePosition,
  FetchUserTasksArguments,
  UserTasks,
} from "../src/tableBuildingFunctions/types";
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
        position: EmployeePosition.TeamLead,
      },
      {
        name: "Matrosova Marianna",
        jiraUsername: "MatrosovaM",
        position: EmployeePosition.SoftwareEngineer,
      },
      {
        name: "Karaseva Svetlana",
        jiraUsername: "KarasevaS",
        position: EmployeePosition.SoftwareEngineer,
      },
    ],
  };
}

export function getFetchUserTasksForTests(): ({
  jiraUserName,
  login,
  password,
}: FetchUserTasksArguments) => Promise<UserTasks> {
  return (user) => {
    const users = {
      KarasevaS: {
        tasks: [
          { taskKey: "task 1", epicKey: "" },
          { taskKey: "task 3", epicKey: "" },
        ],
        userName: "KarasevaS",
      },
      MatrosovaM: {
        tasks: [{ taskKey: "task 2", epicKey: "epic task 1" }],
        userName: "MatrosovaM",
      },
    };
    return users[user.jiraUserName];
  };
}

export function getMonthRowsForTests() {
  const startMonthHeaderPoint: Point = START_MONTH_HEADER_POINT;
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
