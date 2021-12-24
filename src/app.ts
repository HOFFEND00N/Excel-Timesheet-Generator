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
import { isNumericCell, isStringCell, makeTable } from "./tableBuildingFunctions";

(async () => {
  const { config, login, password, nonWorkingHoursFile } = await getUserData();

  for (const [index, team] of config.teams.entries()) {
    const workBook = new excel.Workbook({});
    const workSheet = workBook.addWorksheet(WORKSHEET_MONTHLY_TIMESHEET_NAME);
    const image: IWorksheetImage = {
      path: "images/confirmit.jpg",
      column: 2,
      row: 2,
    };
    const workingHoursByEmployeesUsername = await getWorkingHoursByEmployeesUsername({
      workingHoursPerMonth: config.workingHoursPerMonth,
      team: [...config.teams[index].employees, config.teams[index].teamLead],
    });
    const userTasksByEmployeeUsername = await getUserTasks({
      employeeJiraTaskQuery: config.jiraTaskQuery,
      login: login,
      password: password,
      fetchUserTasks: fetchJiraUserTasks,
      team,
    });

    const currentDate = config.date ? new Date(config.date.year, config.date.month) : new Date();
    const table = await makeTable({
      config: config.teams[index],
      currentDate,
      userTasksByEmployeeUsername,
      workingHoursByEmployeesUsername,
      nonWorkingHoursFile,
    });

    const employeeColumn = START_TABLE_POINT.column + TABLE_HEADERS.findIndex((header) => header.label === "Employee");
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

    const reportName = makeReportFileName({
      currentDate,
      unit: config.teams[index].unit,
      fileNameTemplate: config.teams[index].fileNameTemplate,
    });
    await makeXlsxFile(workBook, reportName);

    const manHoursColumn = TABLE_HEADERS.findIndex((header) => header.label === "Man-Hours");

    addPivotTableToXlsxFile({
      reportName,
      config: config.teams[index],
      workingHoursByEmployeesUsername,
      table,
      employeeColumnIndex: employeeColumn - START_TABLE_POINT.column,
      manHoursColumnIndex: manHoursColumn,
    });
    console.log(`Successfully generated ${reportName}`);
  }
})();
