import { makeTable } from "./tableBuildingFunctions/makeTable";
import { getStartTablePoint, getWorksheetName } from "./constants/constant";
import excel from "excel4node";
import * as fs from "fs";
import { TableData } from "./classes/TableData";
import { Point } from "./classes/Point";
import { TableCell } from "./classes/TableCell";
import { From, Position, WorksheetImage } from "./classes/WorksheetImage";
import { makeDefaultTextStyle } from "./constants/styleConstants";

let tabledata: TableData = JSON.parse(
  fs.readFileSync("tableData.json", "utf-8")
);
let workBook = new excel.Workbook({});
let workSheet = workBook.addWorksheet(getWorksheetName());
let startTablePoint: Point = getStartTablePoint();
let image: WorksheetImage = new WorksheetImage(
  "picture",
  "images/confirmit.jpg",
  new Position("oneCellAnchor", new From(2, 2))
);

let table: Array<TableCell> = makeTable(tabledata, startTablePoint);

for (const tableCell of table) {
  workSheet
    .cell(tableCell.point.row, tableCell.point.col)
    .string(tableCell.value);
  for (const style of tableCell.styles) {
    workSheet.cell(tableCell.point.row, tableCell.point.col).style(style);
  }
}
workSheet.addImage(image);

workBook.write("Report.xlsx");
console.log("Successfully generated Report.xls");
