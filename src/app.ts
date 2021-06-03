import { makeTable } from "./tableBuildingFunctions/makeTable";
import excel from "excel4node";
import * as fs from "fs";
import { TableData } from "./classes/TableData";
import { WorksheetImage } from "./classes/WorksheetImage";
import { WorkSheetImageAdapter } from "./classes/WorkSheetImageAdapter";
import { isNumericCell, isStringCell } from "./tableBuildingFunctions/types";
import { fetchJiraUserTasks } from "./tableBuildingFunctions/fetchJiraUserTasks";
import { getCredentials } from "./tableBuildingFunctions/getCredentials";
import { WORKSHEET_MONTHLY_TIMESHEET_NAME } from "./constants/constant";
import { getNonWorkingHoursFile } from "./tableBuildingFunctions/getNonWorkingHoursFile";

(async () => {
  const workBook = new excel.Workbook({});
  const workSheet = workBook.addWorksheet(WORKSHEET_MONTHLY_TIMESHEET_NAME);
  const image: WorksheetImage = {
    path: "images/confirmit.jpg",
    column: 2,
    row: 2,
  };

  const tableData: TableData = JSON.parse(
    fs.readFileSync("tableData.json", "utf-8")
  );
  const table = await makeTable({
    tableData,
    currentDate: new Date(),
    fetchUserTasks: fetchJiraUserTasks,
    getCredentials,
    getNonWorkingHoursFile,
  });

  //not tested, need to test excel file appearance too?
  //may be compare screenshots
  const employeeColumn = table.find((item) => item.value == "Employee").point
    .column;
  const taskColumn = table.find((item) => item.value == "Task").point.column;

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

  workBook.write("Report.xlsx");
  console.log("Successfully generated Report.xlsx");
})();
