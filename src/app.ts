import excel from "excel4node";
import * as fs from "fs";
import { TableData } from "./classes/TableData";
import { WorksheetImage } from "./classes/WorksheetImage";
import { WorkSheetImageAdapter } from "./classes/WorkSheetImageAdapter";
import {
  areJiraCredentialsCorrect,
  fetchJiraUserTasks,
  getCredentials,
  getNonWorkingHoursFile,
  getWorkingHoursPerMonth,
  isNumericCell,
  isStringCell,
  makeTable,
} from "./tableBuildingFunctions";
import { START_TABLE_POINT, TABLE_HEADERS, WORKSHEET_MONTHLY_TIMESHEET_NAME } from "./constants/constant";
import { makeReportFileName } from "./makeReportFileName";
import { addPivotTableToXlsxFile, makeXlsxFile } from "./XlsxFileBuildingFunctions";

(async () => {
  const workBook = new excel.Workbook({});
  const workSheet = workBook.addWorksheet(WORKSHEET_MONTHLY_TIMESHEET_NAME);
  const image: WorksheetImage = {
    path: "images/confirmit.jpg",
    column: 2,
    row: 2,
  };

  const tableData: TableData = JSON.parse(fs.readFileSync("tableData.json", "utf-8"));

  const workingHoursPerMonth = await getWorkingHoursPerMonth();

  const currentDate = new Date();
  const table = await makeTable({
    tableData,
    currentDate,
    fetchUserTasks: fetchJiraUserTasks,
    getCredentials,
    getNonWorkingHoursFile,
    workingHoursPerMonth,
    isJiraCredentialsCorrect: areJiraCredentialsCorrect,
  });

  const employeeColumn = START_TABLE_POINT.column + TABLE_HEADERS.findIndex((header) => header.label == "Employee");
  const taskColumn = START_TABLE_POINT.column + TABLE_HEADERS.findIndex((header) => header.label == "Task");

  workSheet.column(employeeColumn).setWidth(25);
  workSheet.column(taskColumn).setWidth(50);

  for (const tableCell of table) {
    const cell = workSheet.cell(tableCell.point.row, tableCell.point.column);
    if (isNumericCell(tableCell)) cell.number(tableCell.value);
    if (isStringCell(tableCell)) cell.string(tableCell.value);

    if (tableCell.point.column == taskColumn)
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

  const reportName = makeReportFileName(currentDate, tableData.unit);
  await makeXlsxFile(workBook, reportName);

  const manHoursColumn = TABLE_HEADERS.findIndex((header) => header.label == "Man-Hours");

  addPivotTableToXlsxFile({
    reportName,
    tableData,
    workingHoursPerMonth,
    table,
    employeeColumnIndex: employeeColumn - START_TABLE_POINT.column,
    manHoursColumnIndex: manHoursColumn,
  });
  console.log(`Successfully generated ${reportName}`);
})();
