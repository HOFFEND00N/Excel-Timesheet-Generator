import { makeTable } from "../src/tableBuildingFunctions/makeTable";
import { getStartTablePoint, getTableHeaders } from "../src/constants/constant";
import {
  HorizontalAlignTextWays,
  makeBoldCellTextStyle,
  makeCellBorderStyle,
  makeDefaultTextStyle,
  makeStyleHorizontalAlignText,
} from "../src/constants/styleConstants";
import { Style } from "../src/classes/Style";
import {
  CommonCell,
  CommonValue,
  NumberValue,
  StringValue,
} from "../src/tableBuildingFunctions/types";
import { TableCell } from "../src/classes/TableCell";
import {
  getFetchUserTasksForTests,
  getMonthRowsForTests,
  getTableDataForTests,
} from "./mockedDataForTests";

test("table data is empty, expect to return table headers + date", async () => {
  const expectedTable: CommonCell[] = [];

  const currentDate: Date = new Date("2020-05-11");
  expectedTable.push(...getMonthRowsForTests());

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

  const currentDate: Date = new Date("2020-05-11");
  expectedTable.push(...getMonthRowsForTests());

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
    [
      651,
      "NO",
      "Confirmit",
      "Studio",
      "Molotkova Maria",
      "task 1 task 3",
      "",
      "",
    ],
    [651, "NO", "Confirmit", "Studio", "Matrosova Marianna", "task 2", "", ""],
  ];

  const startPoint = getStartTablePoint();
  for (let i = 0; i < expectedTableRows.length; i++) {
    const expectedTableRow = expectedTableRows[i];
    for (let j = 0; j < expectedTableRow.length; j++) {
      const value = expectedTableRow[j];
      const tableCell: CommonCell = <
        TableCell<StringValue> | TableCell<NumberValue>
      >{
        point: { column: startPoint.column + j, row: startPoint.row + i + 1 },
        value: value,
        styles: [makeCellBorderStyle(), makeDefaultTextStyle()],
      };
      if (j == 0 || j == 1)
        tableCell.styles.unshift(
          makeStyleHorizontalAlignText(HorizontalAlignTextWays.center)
        );
      expectedTable.push(tableCell);
    }
  }

  const tableData = getTableDataForTests();

  const actualTable = await makeTable({
    tableData,
    currentDate,
    fetchUserTasks: getFetchUserTasksForTests(),
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
