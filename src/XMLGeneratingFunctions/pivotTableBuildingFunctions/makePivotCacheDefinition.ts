import { Employee } from "../../classes/Employee";
import { create } from "xmlbuilder2";
import { XMLBuilder } from "xmlbuilder2/lib/interfaces";
import { TABLE_HEADERS } from "../../constants/constant";

export function makePivotCacheDefinition(employees: Employee[]): XMLBuilder {
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
    .ele("worksheetSource", { ref: "B8:I22", sheet: "Monthly timesheet" })
    .up()
    .up()
    .ele("cacheFields", { count: `${TABLE_HEADERS.length}` });

  for (const tableHeader of TABLE_HEADERS) {
    makePivotCacheField({
      name: tableHeader.label,
      xml: pivotCacheDefinition,
      employees,
    });
  }

  return pivotCacheDefinition;
}

function makePivotCacheField({
  name,
  xml,
  employees,
}: {
  name: string;
  xml: XMLBuilder;
  employees: Employee[];
}): XMLBuilder {
  xml = xml.ele("cacheField", { name: name, numFmtId: "0" }).ele("sharedItems");
  if (name == "Employee") makePivotCacheFieldEmployees(xml, employees);

  return xml.up().up();
}

function makePivotCacheFieldEmployees(
  pivotCacheDefinition: XMLBuilder,
  employees: Employee[]
) {
  pivotCacheDefinition = pivotCacheDefinition.att(
    "count",
    `${employees.length}`
  );
  for (const employee of employees) {
    pivotCacheDefinition = pivotCacheDefinition
      .ele("s", { v: `${employee.name}` })
      .up();
  }
  pivotCacheDefinition.up().up();
}
