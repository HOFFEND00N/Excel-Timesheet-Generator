import { TableData } from "../classes/TableData";
import path from "path";
import fs from "fs";
import admZip from "adm-zip";
import {
  makeContentTypes,
  makePivotCacheDefinition,
  makePivotCacheDefinitionRels,
  makePivotCacheRecords,
  makePivotTable,
  makePivotTableRels,
  makeWorkbook,
  makeWorkbookRels,
  makeWorksheetWithPivotTable,
  makeWorksheetWithPivotTableRels,
} from "../XMLBuildingFunctions";
import { CommonCell } from "../tableBuildingFunctions/types";
import { create } from "xmlbuilder2";
import { START_TABLE_POINT, TABLE_HEADERS } from "../constants/constant";

export function addPivotTableToXlsxFile({
  reportName,
  tableData,
  workingHoursPerMonth,
  table,
  employeeColumnIndex,
  manHoursColumnIndex,
}: {
  reportName: string;
  tableData: TableData;
  workingHoursPerMonth: number;
  table: CommonCell[];
  employeeColumnIndex: number;
  manHoursColumnIndex: number;
}) {
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
    create({ Relationships: makeWorkbookRels() }).end()
  );
  fs.writeFileSync(
    path.join(xl_pivotCache, "pivotCacheDefinition1.xml"),
    create({
      pivotCacheDefinition: makePivotCacheDefinition({
        employees: employeesWithTeamLead,
        tableBottomRightPoint: table[table.length - 1].point,
      }),
    }).end()
  );
  fs.writeFileSync(
    path.join(xl_pivotCache, "pivotCacheRecords1.xml"),
    create({
      pivotCacheRecords: makePivotCacheRecords({
        table,
        employees: employeesWithTeamLead,
        recordElementsCount: TABLE_HEADERS.length,
        startTablePoint: START_TABLE_POINT,
      }),
    }).end()
  );
  fs.writeFileSync(
    path.join(xl_pivotCache_rels, "pivotCacheDefinition1.xml.rels"),
    create({ Relationships: makePivotCacheDefinitionRels() }).end()
  );
  fs.writeFileSync(
    path.join(xl_pivotTables_rels, "pivotTable1.xml.rels"),
    create({ Relationships: makePivotTableRels() }).end()
  );
  fs.writeFileSync(
    path.join(xl_pivotTables, "pivotTable1.xml"),
    create({
      pivotTableDefinition: makePivotTable({
        employees: employeesWithTeamLead,
        employeeColumnIndex: employeeColumnIndex,
        manHoursColumnIndex: manHoursColumnIndex,
      }),
    }).end()
  );
  fs.writeFileSync(
    path.join(xl_worksheets_rels, "sheet2.xml.rels"),
    create({ Relationships: makeWorksheetWithPivotTableRels() }).end()
  );
  fs.writeFileSync(
    path.join(xl_worksheets, "sheet2.xml"),
    create({
      worksheet: makeWorksheetWithPivotTable({
        employees: employeesWithTeamLead,
        workingHoursPerMonth,
      }),
    }).end()
  );
  fs.writeFileSync(path.join(whereToExtract, "xl/workbook.xml"), create({ workbook: makeWorkbook() }).end());
  fs.writeFileSync(path.join(whereToExtract, "[Content_Types].xml"), create({ Types: makeContentTypes() }).end());

  zip = new admZip();
  zip.addLocalFolder(whereToExtract);
  zip.writeZip(`${reportName}`);

  fs.rmdirSync(whereToExtract, { recursive: true });
}
