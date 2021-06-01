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

test("table data is empty, expect to return table headers + date", async () => {
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

  const headerStyles: Style[] = [
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
    getCredentials: () => Promise.resolve({ login: "", password: "" }),
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
    [651, "NO", "Confirmit", "Studio", "Molotkova Maria", "task 1 task 1"],
    [651, "NO", "Confirmit", "Studio", "Matrosova Marianna", "task 2"],
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

  const tableData: TableData = {
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

  const actualTable = await makeTable({
    tableData,
    currentDate,
    fetchUserTasks: (user) => {
      const users = {
        MolotkovaM: ["task 1", "task 1"],
        MatrosovaM: ["task 2"],
      };
      return users[user.jiraUserName];
    },
    getCredentials: () => Promise.resolve({ login: "", password: "" }),
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
