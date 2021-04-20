import { makeTable } from "./tableBuildingFunctions/makeTable";
import {
  getStartTablePoint,
  getWorksheetMonthlyTimesheetName,
} from "./constants/constant";
import excel from "excel4node";
import * as fs from "fs";
import { TableData } from "./classes/TableData";
import { Point } from "./classes/Point";
import { TableCell } from "./classes/TableCell";
import { WorksheetImage } from "./classes/WorksheetImage";
import { WorkSheetImageAdapter } from "./classes/WorkSheetImageAdapter";

let tabledata: TableData = JSON.parse(
  fs.readFileSync("tableData.json", "utf-8")
);
let workBook = new excel.Workbook({});
let workSheet = workBook.addWorksheet(getWorksheetMonthlyTimesheetName());
let startTablePoint: Point = getStartTablePoint();
let image: WorksheetImage = new WorksheetImage({
  path: "images/confirmit.jpg",
  column: 2,
  row: 2,
});

let table: Array<TableCell> = makeTable(tabledata, startTablePoint);

for (const tableCell of table) {
  workSheet
    .cell(tableCell.point.row, tableCell.point.column)
    .string(tableCell.value);
  for (const style of tableCell.styles) {
    workSheet
      .cell(tableCell.point.row, tableCell.point.column)
      .style(workBook.createStyle(style));
  }
}
workSheet.addImage(new WorkSheetImageAdapter(image));

workBook.write("Report.xlsx");
console.log("Successfully generated Report.xls");
