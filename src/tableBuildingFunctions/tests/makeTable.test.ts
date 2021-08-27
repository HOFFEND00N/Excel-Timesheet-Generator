import { makeTable } from "../index";
import { START_TABLE_POINT, TABLE_HEADERS } from "../../constants/constant";
import {
  HorizontalAlignTextWays,
  makeBoldCellTextStyle,
  makeCellBorderStyle,
  makeDefaultTextStyle,
  makeStyleHorizontalAlignText,
} from "../../constants/styleConstants";
import { CommonCell, CommonValue, NumberValue, StringValue } from "../types";
import { TableCell } from "../../classes/TableCell";
import { getMonthRowsForTests, getTableDataForTests } from "../../../tests/mockedDataForTests";

test("make full table", async () => {
  const expectedTable: CommonCell[] = [];

  const currentDate: Date = new Date("2020-05-11");
  expectedTable.push(...getMonthRowsForTests());

  const startTablePoint = START_TABLE_POINT;
  const tableHeaders = TABLE_HEADERS;
  for (let i = 0; i < tableHeaders.length; i++) {
    const tableHeader = tableHeaders[i];
    expectedTable.push({
      point: { column: startTablePoint.column + i, row: startTablePoint.row },
      value: tableHeader.label,
      styles: [makeBoldCellTextStyle(), makeCellBorderStyle(), makeDefaultTextStyle()],
    });
  }
  const expectedTableRows: CommonValue[][] = [
    [651, "NO", "Confirmit", "Studio", "Matrosova Marianna", "task 2", "", 112],
    [651, "NO", "Confirmit", "Studio", "Karaseva Svetlana", "task 1 task 3", "", 152],
    [651, "NO", "Confirmit", "Studio", "Molotkova Maria", "epic task 1", "", 116],
    [651, "RU", "Confirmit", "DaysOff", "Matrosova Marianna", "25.01.2021", "", 8],
    [651, "RU", "Confirmit", "DaysOff", "Karaseva Svetlana", "20.01.2021", "", 8],
    [651, "RU", "Confirmit", "Holidays", "Molotkova Maria", "20.01.2021-23.01.2021", "", 24],
  ];

  const startPoint = START_TABLE_POINT;
  for (let i = 0; i < expectedTableRows.length; i++) {
    const expectedTableRow = expectedTableRows[i];
    for (let j = 0; j < expectedTableRow.length; j++) {
      const value = expectedTableRow[j];
      const tableCell: CommonCell = <TableCell<StringValue> | TableCell<NumberValue>>{
        point: { column: startPoint.column + j, row: startPoint.row + i + 1 },
        value: value,
        styles: [makeCellBorderStyle(), makeDefaultTextStyle()],
      };
      if (j === 0 || j === 1) tableCell.styles.unshift(makeStyleHorizontalAlignText(HorizontalAlignTextWays.center));
      expectedTable.push(tableCell);
    }
  }

  const tableData = getTableDataForTests();

  const actualTable = await makeTable({
    tableData,
    currentDate,
    userData: {
      workingHoursByEmployeesUsername: {
        KarasevaS: 160,
        MolotkovaM: 140,
        MatrosovaM: 120,
      },
      nonWorkingHoursFile: [
        ["651", "RU", "Confirmit", "DaysOff", "Matrosova Marianna", "25.01.2021", "", "8"],
        ["651", "RU", "Confirmit", "DaysOff", "Karaseva Svetlana", "20.01.2021", "", "8"],
        ["651", "RU", "Confirmit", "Holidays", "Molotkova Maria", "20.01.2021-23.01.2021", "", "24"],
      ],
      password: "",
      login: "",
    },
    userTasksByEmployeeUsername: {
      MatrosovaM: ["task 2"],
      KarasevaS: ["task 1", "task 3"],
      MolotkovaM: ["epic task 1"],
    },
  });

  actualTable.sort(compare);
  expectedTable.sort(compare);

  expect(actualTable).toEqual(expectedTable);
});

function compare(a: CommonCell, b: CommonCell) {
  const columnDiff: number = a.point.column - b.point.column;
  if (columnDiff !== 0) return columnDiff;
  else return a.point.row - b.point.row;
}
