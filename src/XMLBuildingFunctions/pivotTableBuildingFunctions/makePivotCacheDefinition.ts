import { Employee } from "../../classes/Employee";
import { create } from "xmlbuilder2";
import { XMLBuilder } from "xmlbuilder2/lib/interfaces";
import { START_TABLE_POINT, TABLE_HEADERS } from "../../constants/constant";
import { Point } from "../../classes/Point";
import { convertNumberToExcelColumn } from "../../utils/convertNumberToExcelColumn";

export function makePivotCacheDefinition({
  employees,
  tableBottomRightPoint,
}: {
  employees: Employee[];
  tableBottomRightPoint: Point;
}): XMLBuilder {
  const worksheetSourceRef =
    convertNumberToExcelColumn(START_TABLE_POINT.column) +
    START_TABLE_POINT.row +
    ":" +
    convertNumberToExcelColumn(tableBottomRightPoint.column) +
    tableBottomRightPoint.row;

  const pivotCacheDefinition = create({
    encoding: "utf-8",
    standalone: "yes",
  })
    .ele("pivotCacheDefinition", {
      xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
      "xmlns:r":
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
      "r:id": "rId1",
    })
    .ele("cacheSource", { type: "worksheet" })
    .ele("worksheetSource", {
      ref: `${worksheetSourceRef}`,
      sheet: "Monthly timesheet",
    })
    .up()
    .up()
    .ele("cacheFields", { count: `${TABLE_HEADERS.length}` });

  for (const tableHeader of TABLE_HEADERS) {
    makePivotCacheField({
      name: tableHeader.label,
      xmlNode: pivotCacheDefinition,
      employees,
    });
  }

  return pivotCacheDefinition;
}

function makePivotCacheField({
  name,
  xmlNode,
  employees,
}: {
  name: string;
  xmlNode: XMLBuilder;
  employees: Employee[];
}) {
  xmlNode = xmlNode
    .ele("cacheField", { name: name, numFmtId: "0" })
    .ele("sharedItems");
  if (name == "Employee") makePivotCacheFieldEmployees(xmlNode, employees);
}

function makePivotCacheFieldEmployees(
  xmlNode: XMLBuilder,
  employees: Employee[]
) {
  xmlNode = xmlNode.att("count", `${employees.length}`);
  for (const employee of employees) {
    xmlNode = xmlNode.ele("s", { v: `${employee.name}` }).up();
  }
}
