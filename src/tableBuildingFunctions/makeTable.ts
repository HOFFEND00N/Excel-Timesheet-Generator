import {
  HorizontalAlignTextWays,
  makeBoldCellTextStyle,
  makeCellBorderStyle,
  makeDefaultTextStyle,
  makeStyleHorizontalAlignText,
} from "../constants/styleConstants";
import { getStartTablePoint, getTableHeaders } from "../constants/constant";
import { makeMonthRows } from "./makeMonthRows";
import { makeTableRow } from "./makeTableRow";
import { styleTableRow } from "./styleTableRow";
import { makeEmployeeDataRows } from "./makeEmployeeDataRows";
import { TableData } from "../classes/TableData";
import { Point } from "../classes/Point";
import { addTableRowToTable } from "./addTableToRow";
import { CommonCell } from "./types";
import { getEmployeesTasks } from "./getEmployeesTasks";

type makeTableArguments = {
  tableData: TableData;
  currentDate: Date;
  fetchUserTasks: ({
    jiraUserName,
    login,
    password,
  }: {
    jiraUserName: string;
    login: string;
    password: string;
  }) => Promise<string[]>;
  jiraUserNames: string[];
  getCredentials: () => Promise<{ login: string; password: string }>;
};

export async function makeTable({
  tableData,
  currentDate,
  fetchUserTasks,
  jiraUserNames,
  getCredentials,
}: makeTableArguments) {
  const table: CommonCell[] = [];
  const startTablePoint: Point = getStartTablePoint();

  const tableHeaders = getTableHeaders();
  const monthRow = makeMonthRows(currentDate);
  const { row: pointRow, column: pointColumn }: Point = startTablePoint;
  addTableRowToTable(monthRow, table);

  const tableHeadersRow = makeTableRow({
    startPoint: { column: pointColumn, row: pointRow },
    values: tableHeaders.map((item) => item.label),
  });
  styleTableRow({
    row: tableHeadersRow,
    cellStyles: [
      makeBoldCellTextStyle(),
      makeCellBorderStyle(),
      makeDefaultTextStyle(),
    ],
  });
  addTableRowToTable(tableHeadersRow, table);

  const tableRowsValues = makeEmployeeDataRows({
    tableData,
    headers: tableHeadersRow.map((item) => item.value),
  });
  for (let i = 0; i < tableRowsValues.length; i++) {
    const tableRowValues = tableRowsValues[i];
    const row = makeTableRow({
      startPoint: { column: pointColumn, row: pointRow + i + 1 },
      values: tableRowValues,
    });
    styleTableRow({
      row: [row[0], row[1]],
      cellStyles: [
        makeStyleHorizontalAlignText(HorizontalAlignTextWays.center),
      ],
    });
    styleTableRow({
      row,
      cellStyles: [makeCellBorderStyle(), makeDefaultTextStyle()],
    });
    addTableRowToTable(row, table);
  }

  const tasks = await getEmployeesTasks({
    fetchUserTasks,
    jiraUserNames,
    getCredentials,
  });
  const headerTasksCell = table.find((item) => item.value == "Task");

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    table.push({
      point: {
        column: headerTasksCell.point.column,
        row: headerTasksCell.point.row + i + 1,
      },
      styles: [makeCellBorderStyle(), makeDefaultTextStyle()],
      value: task.toString(),
    });
  }

  return table;
}
