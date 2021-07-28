import { makeTable } from "./tableBuildingFunctions/makeTable";
import excel from "excel4node";
import * as fs from "fs";
import { TableData } from "./classes/TableData";
import { WorksheetImage } from "./classes/WorksheetImage";
import { WorkSheetImageAdapter } from "./classes/WorkSheetImageAdapter";
import {
  isNumericCell,
  isStringCell,
  fetchJiraUserTasks,
  getCredentials,
  getNonWorkingHoursFile,
  getWorkingHoursPerMonth,
} from "./tableBuildingFunctions";
import {
  START_TABLE_POINT,
  TABLE_HEADERS,
  WORKSHEET_MONTHLY_TIMESHEET_NAME,
} from "./constants/constant";
import {
  makePivotCacheDefinition,
  makeContentTypes,
  makeWorkbook,
  makePivotTable,
  makePivotCacheRecords,
  makePivotCacheDefinitionRels,
  makeWorksheetWithPivotTable,
  makeWorksheetWithPivotTableRels,
  makeWorkbookRels,
  makePivotTableRels,
} from "./XMLGeneratingFunctions";
import admZip from "adm-zip";
import path from "path";
import { generateReportFileName } from "./generateReportFileName";

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

  const workingHoursPerMonth = await getWorkingHoursPerMonth();

  const currentDate = new Date();
  const table = await makeTable({
    tableData,
    currentDate,
    fetchUserTasks: fetchJiraUserTasks,
    getCredentials,
    getNonWorkingHoursFile,
    workingHoursPerMonth,
  });

  const employeeColumn =
    START_TABLE_POINT.column +
    TABLE_HEADERS.findIndex((header) => header.label == "Employee");
  const taskColumn =
    START_TABLE_POINT.column +
    TABLE_HEADERS.findIndex((header) => header.label == "Task");

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

  const reportName = generateReportFileName(currentDate, tableData.unit);
  await makeXlsxFileWithoutPivotTable(workBook, reportName);

  let zip = new admZip(`${reportName}`);
  const whereToExtract = "unzippedXlsxFile";
  zip.extractAllTo(whereToExtract, true);

  const xl_pivotCache = path.join(whereToExtract, "xl/pivotCache");
  const xl_pivotCache_rels = path.join(xl_pivotCache, "_rels");
  const xl_pivotTables = path.join(whereToExtract, "xl/pivotTables");
  const xl_pivotTables_rels = path.join(xl_pivotTables, "_rels");
  const xl_worksheets = path.join(whereToExtract, "xl/worksheets");
  const xl_worksheets_rels = path.join(xl_worksheets, "_rels");

  fs.mkdirSync(xl_pivotCache);
  fs.mkdirSync(xl_pivotCache_rels);
  fs.mkdirSync(xl_pivotTables);
  fs.mkdirSync(xl_pivotTables_rels);

  const employeesWithTeamLead = [...tableData.employees, tableData.teamLead];

  fs.writeFileSync(
    path.join(whereToExtract, "xl/_rels/workbook.xml.rels"),
    makeWorkbookRels().end()
  );
  fs.writeFileSync(
    path.join(xl_pivotCache, "pivotCacheDefinition1.xml"),
    makePivotCacheDefinition({
      employees: employeesWithTeamLead,
      tableBottomRightPoint: table[table.length - 1].point,
    }).end()
  );
  fs.writeFileSync(
    path.join(xl_pivotCache, "pivotCacheRecords1.xml"),
    makePivotCacheRecords({
      table,
      employees: employeesWithTeamLead,
    }).end()
  );
  fs.writeFileSync(
    path.join(xl_pivotCache_rels, "pivotCacheDefinition1.xml.rels"),
    makePivotCacheDefinitionRels().end()
  );
  fs.writeFileSync(
    path.join(xl_pivotTables_rels, "pivotTable1.xml.rels"),
    makePivotTableRels().end()
  );
  fs.writeFileSync(
    path.join(xl_pivotTables, "pivotTable1.xml"),
    makePivotTable(employeesWithTeamLead).end()
  );
  fs.writeFileSync(
    path.join(xl_worksheets_rels, "sheet2.xml.rels"),
    makeWorksheetWithPivotTableRels().end()
  );
  fs.writeFileSync(
    path.join(xl_worksheets, "sheet2.xml"),
    makeWorksheetWithPivotTable({
      employees: employeesWithTeamLead,
      workingHoursPerMonth,
    }).end()
  );
  fs.writeFileSync(
    path.join(whereToExtract, "xl/workbook.xml"),
    makeWorkbook().end()
  );
  fs.writeFileSync(
    path.join(whereToExtract, "[Content_Types].xml"),
    makeContentTypes().end()
  );

  zip = new admZip();
  zip.addLocalFolder(whereToExtract);
  zip.writeZip(`${reportName}`);

  fs.rmdirSync(whereToExtract, { recursive: true });
  console.log(`Successfully generated ${reportName}`);
})();

function makeXlsxFileWithoutPivotTable(workBook, reportName: string) {
  return new Promise((resolve) => {
    workBook.write(reportName, resolve);
  });
}
