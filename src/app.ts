import excel from "excel4node";
import { IWorksheetImage } from "./models/IWorksheetImage";
import { WorkSheetImageAdapter } from "./models/WorkSheetImageAdapter";
import { START_TABLE_POINT, TABLE_HEADERS, WORKSHEET_MONTHLY_TIMESHEET_NAME } from "./constants/constant";
import { makeReportFileName } from "./makeReportFileName";
import { addPivotTableToXlsxFile, makeXlsxFile } from "./XlsxFileBuildingFunctions";
import { getUserData } from "./userDataCollectionFunctions/getUserData";
import { HoursByEmployees } from "./tableBuildingFunctions/types";
import { makeTableHeadersAndMonthRows } from "./tableBuildingFunctions/makeTableHeadersAndMonthRows";
import { makeTeamTable } from "./tableBuildingFunctions/makeTeamTable";
import { addTableCellsToWorkbook } from "./addTableCellsToWorkbook";
import { makeWorkingHoursByEmployeesUsernameForEachTeam } from "./makeWorkingHoursByEmployeesUsernameForEachTeam";

(async () => {
  const { config, login, password, nonWorkingHoursFile } = await getUserData();

  const currentDate = config.date ? new Date(config.date.year, config.date.month - 1) : new Date();

  const workBook = new excel.Workbook({});
  const workSheet = workBook.addWorksheet(WORKSHEET_MONTHLY_TIMESHEET_NAME);
  const image: IWorksheetImage = {
    path: "images/confirmit.jpg",
    column: 2,
    row: 2,
  };
  workSheet.addImage(new WorkSheetImageAdapter(image));

  const reportName = makeReportFileName({
    currentDate,
    fileNameTemplate: config.fileNameTemplate,
  });
  const employeeColumn = START_TABLE_POINT.column + TABLE_HEADERS.findIndex((header) => header.label === "Employee");

  const commonWorkingHoursByEmployeesUsername: HoursByEmployees = {};
  const workingHoursByEmployeesUsernameForEachTeam = makeWorkingHoursByEmployeesUsernameForEachTeam(config);
  Object.assign(commonWorkingHoursByEmployeesUsername, ...workingHoursByEmployeesUsernameForEachTeam);

  let table = makeTableHeadersAndMonthRows(currentDate);
  table = [
    ...table,
    ...(await makeTeamTable({
      config,
      login,
      nonWorkingHoursFile,
      password,
      workingHoursByEmployeesUsernameForEachTeam,
    })),
  ];

  const taskColumn = START_TABLE_POINT.column + TABLE_HEADERS.findIndex((header) => header.label === "Task");

  workSheet.column(employeeColumn).setWidth(25);
  workSheet.column(taskColumn).setWidth(50);

  addTableCellsToWorkbook({ table, taskColumn, workSheet, workBook });
  await makeXlsxFile(workBook, reportName);

  const manHoursColumn = TABLE_HEADERS.findIndex((header) => header.label === "Man-Hours");

  const allEmployees = config.teams
    .map((team) => {
      return [...team.employees, team.teamLead];
    })
    .flat();

  addPivotTableToXlsxFile({
    reportName,
    employees: allEmployees,
    workingHoursByEmployeesUsername: commonWorkingHoursByEmployeesUsername,
    table,
    employeeColumnIndex: employeeColumn - START_TABLE_POINT.column,
    manHoursColumnIndex: manHoursColumn,
  });
  console.log(`Successfully generated ${reportName}`);
})();
