import excel from "excel4node";
import { IWorksheetImage } from "./models/IWorksheetImage";
import { WorkSheetImageAdapter } from "./models/WorkSheetImageAdapter";
import { START_TABLE_POINT, TABLE_HEADERS, WORKSHEET_MONTHLY_TIMESHEET_NAME } from "./constants/constant";
import { makeReportFileName } from "./makeReportFileName";
import { addPivotTableToXlsxFile, makeXlsxFile } from "./XlsxFileBuildingFunctions";
import { getWorkingHoursByEmployeesUsername } from "./userDataCollectionFunctions";
import { getUserTasks } from "./tableBuildingFunctions/jiraHelpers";
import { fetchJiraUserTasks } from "./tableBuildingFunctions/jiraHelpers/fetchJiraUserTasks";
import { getUserData } from "./userDataCollectionFunctions/getUserData";
import {
  getNonWorkingHoursRows,
  isNumericCell,
  isStringCell,
  makeMonthRows,
  makeTable,
  makeTableRow,
  styleTableRow,
} from "./tableBuildingFunctions";
import { CommonCell, HoursByEmployees } from "./tableBuildingFunctions/types";
import { IPoint } from "./models/IPoint";
import { makeBoldCellTextStyle, makeCellBorderStyle, makeDefaultTextStyle } from "./constants/styleConstants";

(async () => {
  const { config, login, password, nonWorkingHoursFile } = await getUserData();
  let reportName = "",
    table: CommonCell[] = [],
    employeeColumn = 0,
    startRow = START_TABLE_POINT.row + 1;

  const overallWorkingHoursByEmployeesUsername: HoursByEmployees = {};
  const startTablePoint: IPoint = START_TABLE_POINT;

  const tableHeaders = TABLE_HEADERS;
  const currentDate = config.date ? new Date(config.date.year, config.date.month - 1) : new Date();
  const monthRow = makeMonthRows(currentDate);
  const { row: pointRow, column: pointColumn }: IPoint = startTablePoint;
  table.push(...monthRow);

  const tableHeadersRow = makeTableRow({
    startPoint: { column: pointColumn, row: pointRow },
    values: tableHeaders.map((item) => item.label),
  });
  styleTableRow({
    row: tableHeadersRow,
    cellStyles: [makeBoldCellTextStyle(), makeCellBorderStyle(), makeDefaultTextStyle()],
  });
  table.push(...tableHeadersRow);

  for (const team of config.teams) {
    const workBook = new excel.Workbook({});
    const workSheet = workBook.addWorksheet(WORKSHEET_MONTHLY_TIMESHEET_NAME);
    const image: IWorksheetImage = {
      path: "images/confirmit.jpg",
      column: 2,
      row: 2,
    };
    const workingHoursByEmployeesUsername = getWorkingHoursByEmployeesUsername({
      workingHoursPerMonth: config.workingHoursPerMonth,
      team: [...team.employees, team.teamLead],
    });
    Object.assign(overallWorkingHoursByEmployeesUsername, workingHoursByEmployeesUsername);
    const userTasksByEmployeeUsername = await getUserTasks({
      employeeJiraTaskQuery: config.jiraTaskQuery,
      login: login,
      password: password,
      fetchUserTasks: fetchJiraUserTasks,
      team,
    });

    const nonWorkingHoursRows = await getNonWorkingHoursRows(team, nonWorkingHoursFile);

    table = table.concat(
      table,
      await makeTable({
        config: team,
        userTasksByEmployeeUsername,
        workingHoursByEmployeesUsername,
        nonWorkingHoursRows,
        startRow,
      })
    );

    startRow += nonWorkingHoursRows.length + team.employees.length + 2;
    employeeColumn = START_TABLE_POINT.column + TABLE_HEADERS.findIndex((header) => header.label === "Employee");
    const taskColumn = START_TABLE_POINT.column + TABLE_HEADERS.findIndex((header) => header.label === "Task");

    workSheet.column(employeeColumn).setWidth(25);
    workSheet.column(taskColumn).setWidth(50);

    for (const tableCell of table) {
      const cell = workSheet.cell(tableCell.point.row, tableCell.point.column);
      if (isNumericCell(tableCell)) cell.number(tableCell.value);
      if (isStringCell(tableCell)) cell.string(tableCell.value);

      if (tableCell.point.column === taskColumn)
        cell.style(
          workBook.createStyle({
            alignment: {
              wrapText: true,
            },
          })
        );

      for (const style of tableCell.styles) {
        cell.style(workBook.createStyle(style));
      }
    }
    workSheet.addImage(new WorkSheetImageAdapter(image));

    reportName = makeReportFileName({
      currentDate,
      fileNameTemplate: config.fileNameTemplate,
    });
    await makeXlsxFile(workBook, reportName);
  }

  const manHoursColumn = TABLE_HEADERS.findIndex((header) => header.label === "Man-Hours");

  const allEmployees = config.teams
    .map((team) => {
      return [...team.employees, team.teamLead];
    })
    .flat();

  addPivotTableToXlsxFile({
    reportName,
    employees: allEmployees,
    workingHoursByEmployeesUsername: overallWorkingHoursByEmployeesUsername,
    table,
    employeeColumnIndex: employeeColumn - START_TABLE_POINT.column,
    manHoursColumnIndex: manHoursColumn,
  });
  console.log(`Successfully generated ${reportName}`);
})();
