import { makeTable } from "./tableBuildingFunctions/makeTable";
import {
  getJiraUserNames,
  getWorksheetMonthlyTimesheetName,
} from "./constants/constant";
import excel from "excel4node";
import * as fs from "fs";
import { TableData } from "./classes/TableData";
import { WorksheetImage } from "./classes/WorksheetImage";
import { WorkSheetImageAdapter } from "./classes/WorkSheetImageAdapter";
import { isNumericCell, isStringCell } from "./tableBuildingFunctions/types";
import { fetchJiraUserTasks } from "./tableBuildingFunctions/fetchJiraTasks";

export async function buildDocument() {
  const tabledata: TableData = JSON.parse(
    fs.readFileSync("tableData.json", "utf-8")
  );
  const workBook = new excel.Workbook({});
  const workSheet = workBook.addWorksheet(getWorksheetMonthlyTimesheetName());
  const image: WorksheetImage = {
    path: "images/confirmit.jpg",
    column: 2,
    row: 2,
  };

  const table = await makeTable({
    tableData: tabledata,
    currentDate: new Date(),
    fetchUserTasks: fetchJiraUserTasks,
    jiraUserNames: getJiraUserNames(),
  });

  for (const tableCell of table) {
    const cell = workSheet.cell(tableCell.point.row, tableCell.point.column);
    if (isNumericCell(tableCell)) cell.number(tableCell.value);
    if (isStringCell(tableCell)) cell.string(tableCell.value);

    for (const style of tableCell.styles) {
      cell.style(workBook.createStyle(style));
    }
    cell.style(
      workBook.createStyle({
        alignment: {
          wrapText: true,
        },
      })
    );
  }
  workSheet.addImage(new WorkSheetImageAdapter(image));

  workBook.write("Report.xlsx");
  console.log("Successfully generated Report.xlsx");
}
