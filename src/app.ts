//TODO: try to make decorator
import { makeTable } from "./tableBuildingFunctions/makeTable";
import {
  startTablePoint,
  worksheetName,
} from "./tableBuildingFunctions/constant";
import excel from "excel4node";
import * as fs from "fs";

let tableData = JSON.parse(fs.readFileSync("tableData.json", "utf-8"));
let workbook = new excel.Workbook();

workbook.addWorksheet(worksheetName);

export { workbook };

workbook = makeTable(startTablePoint, workbook, tableData);
workbook.write("Report.xlsx");
console.log("Successfully generated Report.xlsx");
