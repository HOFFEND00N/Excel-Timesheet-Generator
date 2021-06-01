import {
  HorizontalAlignTextWays,
  makeBoldCellTextStyle,
  makeCellBorderStyle,
  makeDefaultTextStyle,
  makeStyleHorizontalAlignText,
} from "../constants/styleConstants";
import { START_TABLE_POINT, TABLE_HEADERS } from "../constants/constant";
import { makeMonthRows } from "./makeMonthRows";
import { makeTableRow } from "./makeTableRow";
import { styleTableRow } from "./styleTableRow";
import { makeEmployeeDataRows } from "./makeEmployeeDataRows";
import { TableData } from "../classes/TableData";
import { Point } from "../classes/Point";
import { CommonCell, FetchUserTasksArguments } from "./types";
import { getNonWorkingHoursRows } from "./getNonWorkingHoursRows";
import { makeWorkingHoursByEmployees } from "./makeWorkingHoursByEmployees";
import { makeNonWorkingHoursByEmployees } from "./makeNonWorkingHoursByEmployees";

type MakeTableArguments = {
  tableData: TableData;
  currentDate: Date;
  fetchUserTasks: ({
    jiraUserName,
    login,
    password,
  }: FetchUserTasksArguments) => Promise<string[]>;
  getCredentials: () => Promise<{ login: string; password: string }>;
  getNonWorkingHoursFile: () => Promise<string[][]>;
  getWorkingHoursForMonth: () => Promise<number>;
};

export async function makeTable({
  tableData,
  currentDate,
  fetchUserTasks,
  getCredentials,
  getNonWorkingHoursFile,
  getWorkingHoursForMonth,
}: MakeTableArguments): Promise<CommonCell[]> {
  const table: CommonCell[] = [];
  const startTablePoint: Point = START_TABLE_POINT;

  const tableHeaders = TABLE_HEADERS;
  const monthRow = makeMonthRows(currentDate);
  const { row: pointRow, column: pointColumn }: Point = startTablePoint;
  table.push(...monthRow);

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
  table.push(...tableHeadersRow);

  const tableRowsValues = await makeEmployeeDataRows({
    tableData,
    headers: tableHeaders,
    fetchUserTasks,
    getCredentials,
  });
  const nonWorkingHoursRows = await getNonWorkingHoursRows(
    tableData,
    getNonWorkingHoursFile
  );

  tableRowsValues.push(...nonWorkingHoursRows);

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
    table.push(...row);
  }

  const tableHeadersLabels = tableHeaders.map((item) => item.label);
  const employeeColumn = tableHeadersLabels.indexOf("Employee");
  const manHoursColumn = tableHeadersLabels.indexOf("Man-Hours");

  const nonWorkingHoursByEmployees = makeNonWorkingHoursByEmployees({
    employeeColumn,
    manHoursColumn,
    nonWorkingHoursRows,
  });

  const workingHoursPerMonth = await getWorkingHoursForMonth();
  const employeesNames = tableData.employees.map((employee) => employee.name);
  const workingHoursByEmployees = makeWorkingHoursByEmployees({
    nonWorkingHoursByEmployees,
    workingHoursPerMonth,
    employeesNames,
  });

  for (let i = 0; i < tableData.employees.length; i++) {
    const employee = tableData.employees[i];
    table.push({
      value: Number(workingHoursPerMonth),
      styles: [makeCellBorderStyle(), makeDefaultTextStyle()],
      point: {
        column: startTablePoint.column + manHoursColumn,
        row: startTablePoint.row + i + 1,
      },
    });

    const workingHoursByEmployee = workingHoursByEmployees.get(employee.name);
    if (workingHoursByEmployee)
      table[table.length - 1].value = workingHoursByEmployee;
  }

  return table;
}
