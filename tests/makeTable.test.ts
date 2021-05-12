import { makeTable } from "../src/tableBuildingFunctions/makeTable";
import {
  getMonthNames,
  getMontlyTimesheetHeader,
  getStartMonthHeaderPoint,
  getStartTablePoint,
  getTableHeaders,
} from "../src/constants/constant";
import {
  HorizontalAlignTextWays,
  makeBoldCellTextStyle,
  makeCellBorderStyle,
  makeDefaultTextStyle,
  makeStyleHorizontalAlignText,
  makeYellowBackgroundStyle,
} from "../src/constants/styleConstants";
import { Point } from "../src/classes/Point";
import { TableData } from "../src/classes/TableData";
import { Style } from "../src/classes/Style";
import { CommonCell, CommonValue } from "../src/tableBuildingFunctions/types";
import { getEmployeesTasks } from "../src/tableBuildingFunctions/fetchJiraTasks";

test("table data is empty expect just table headers + date", async () => {
  const expectedTable: CommonCell[] = [];
  const currentDate: Date = new Date();
  const { column, row }: Point = getStartMonthHeaderPoint();

  expectedTable.push({
    point: {
      column: column,
      row: row,
    },
    value: getMontlyTimesheetHeader(),
    styles: [makeBoldCellTextStyle(), makeDefaultTextStyle()],
  });
  expectedTable.push({
    point: {
      column: column,
      row: row + 1,
    },
    value: getMonthNames(currentDate.getMonth()),
    styles: [
      makeYellowBackgroundStyle(),
      makeStyleHorizontalAlignText(HorizontalAlignTextWays.right),
      makeDefaultTextStyle(),
    ],
  });
  expectedTable.push({
    point: { column: column + 1, row: row + 1 },
    value: currentDate.getFullYear(),
    styles: [
      makeYellowBackgroundStyle(),
      makeStyleHorizontalAlignText(HorizontalAlignTextWays.left),
      makeDefaultTextStyle(),
    ],
  });

  const headerStyles: Array<Style> = [
    makeBoldCellTextStyle(),
    makeCellBorderStyle(),
    makeDefaultTextStyle(),
  ];
  const startTablePoint = getStartTablePoint();
  const tableHeaders = getTableHeaders();
  for (let i = 0; i < tableHeaders.length; i++) {
    const tableHeader = tableHeaders[i];
    expectedTable.push({
      point: { column: startTablePoint.column + i, row: startTablePoint.row },
      value: tableHeader.label,
      styles: headerStyles,
    });
  }

  const actualTable = await makeTable({
    tableData: {
      employees: [],
      companyCode: "",
      companyName: "",
      unit: 0,
      project: "",
    },
    currentDate: currentDate,
    fetchUserTasks: () => Promise.resolve([]),
    jiraUserNames: [],
    getCredentials: () => {
      return { login: "", password: "" };
    },
  });

  expect(actualTable).toEqual(expectedTable);
});

test("make full table", async () => {
  const expectedTable: CommonCell[] = [];
  const startMonthHeaderPoint: Point = getStartMonthHeaderPoint();
  const currentDate: Date = new Date();
  expectedTable.push({
    point: startMonthHeaderPoint,
    value: getMontlyTimesheetHeader(),
    styles: [makeBoldCellTextStyle(), makeDefaultTextStyle()],
  });

  expectedTable.push({
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
  expectedTable.push({
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

  const startTablePoint = getStartTablePoint();
  const tableHeaders = getTableHeaders();
  for (let i = 0; i < tableHeaders.length; i++) {
    const tableHeader = tableHeaders[i];
    expectedTable.push({
      point: { column: startTablePoint.column + i, row: startTablePoint.row },
      value: tableHeader.label,
      styles: [
        makeBoldCellTextStyle(),
        makeCellBorderStyle(),
        makeDefaultTextStyle(),
      ],
    });
  }
  const expectedTableRows: CommonValue[][] = [
    [651, "NO", "Confirmit", "Studio", "Kachalov Alexey"],
    [651, "NO", "Confirmit", "Studio", "Kolokolenkina Natalia"],
    [651, "NO", "Confirmit", "Studio", "Kozlova Anna"],
    [651, "NO", "Confirmit", "Studio", "Pisarenko Dmitry"],
    [651, "NO", "Confirmit", "Studio", "Popov Sergey"],
    [651, "NO", "Confirmit", "Studio", "Protasov Ilya"],
    [651, "NO", "Confirmit", "Studio", "Sumatokhin Alexey"],
    [651, "NO", "Confirmit", "Studio", "Volyakov Dmitry"],
    [651, "NO", "Confirmit", "Studio", "Volyakova Kristina"],
  ];

  const startPoint = getStartTablePoint();
  for (let i = 0; i < expectedTableRows.length; i++) {
    const expectedTableRow = expectedTableRows[i];
    for (let j = 0; j < expectedTableRow.length; j++) {
      const value = expectedTableRow[j];
      let tableCell;
      if (j == 0 || j == 1) {
        tableCell = {
          point: { column: startPoint.column + j, row: startPoint.row + i + 1 },
          value: value,
          styles: [
            makeStyleHorizontalAlignText(HorizontalAlignTextWays.center),
            makeCellBorderStyle(),
            makeDefaultTextStyle(),
          ],
        };
      } else {
        tableCell = {
          point: { column: startPoint.column + j, row: startPoint.row + i + 1 },
          value: value,
          styles: [makeCellBorderStyle(), makeDefaultTextStyle()],
        };
      }
      expectedTable.push(tableCell);
    }
  }

  const tasks: string[][] = await getEmployeesTasks({
    fetchUserTasks: (user) => {
      const tmp = {
        alexeyk: ["task 1"],
        NataliaK: ["task 2"],
        AnnaKo: ["task 3"],
        DmitryP: ["task 4"],
        SergeyPo: ["task 5"],
        "Ilia.Protasov": ["task 6"],
        AlexeySu: ["task 7"],
        DmitryV: ["task 8"],
        KristinaZ: ["task 9"],
      };
      return tmp[user.jiraUserName];
    },
    jiraUserNames: [
      "alexeyk",
      "NataliaK",
      "AnnaKo",
      "DmitryP",
      "SergeyPo",
      "Ilia.Protasov",
      "AlexeySu",
      "DmitryV",
      "KristinaZ",
    ],
    getCredentials: () => {
      return { login: "", password: "" };
    },
  });

  const headerTasksCell = expectedTable.find((item) => item.value == "Task");

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    expectedTable.push({
      point: {
        column: headerTasksCell.point.column,
        row: headerTasksCell.point.row + i + 1,
      },
      styles: [makeCellBorderStyle(), makeDefaultTextStyle()],
      value: task.toString(),
    });
  }

  const tabledata: TableData = {
    unit: 651,
    companyCode: "NO",
    companyName: "Confirmit",
    project: "Studio",
    employees: [
      {
        name: "Kachalov Alexey",
        jiraUsername: "alexeyk",
      },
      {
        name: "Kolokolenkina Natalia",
        jiraUsername: "NataliaK",
      },
      {
        name: "Kozlova Anna",
        jiraUsername: "AnnaKo",
      },
      {
        name: "Pisarenko Dmitry",
        jiraUsername: "DmitryP",
      },
      {
        name: "Popov Sergey",
        jiraUsername: "SergeyPo",
      },
      {
        name: "Protasov Ilya",
        jiraUsername: "Ilia.Protasov",
      },
      {
        name: "Sumatokhin Alexey",
        jiraUsername: "AlexeySu",
      },
      {
        name: "Volyakov Dmitry",
        jiraUsername: "DmitryV",
      },
      {
        name: "Volyakova Kristina",
        jiraUsername: "KristinaZ",
      },
    ],
  };

  const actualTable = await makeTable({
    tableData: tabledata,
    currentDate,
    fetchUserTasks: (user) => {
      const tmp = {
        alexeyk: ["task 1"],
        NataliaK: ["task 2"],
        AnnaKo: ["task 3"],
        DmitryP: ["task 4"],
        SergeyPo: ["task 5"],
        "Ilia.Protasov": ["task 6"],
        AlexeySu: ["task 7"],
        DmitryV: ["task 8"],
        KristinaZ: ["task 9"],
      };
      return tmp[user.jiraUserName];
    },
    jiraUserNames: [
      "alexeyk",
      "NataliaK",
      "AnnaKo",
      "DmitryP",
      "SergeyPo",
      "Ilia.Protasov",
      "AlexeySu",
      "DmitryV",
      "KristinaZ",
    ],
    getCredentials: () => {
      return { login: "", password: "" };
    },
  });

  actualTable.sort(compare);
  expectedTable.sort(compare);

  expect(actualTable).toEqual(expectedTable);
});

function compare(a: CommonCell, b: CommonCell) {
  const columnDiff: number = a.point.column - b.point.column;
  if (columnDiff != 0) return columnDiff;
  else return a.point.row - b.point.row;
}
