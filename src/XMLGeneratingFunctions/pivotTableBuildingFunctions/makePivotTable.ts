import { create } from "xmlbuilder2";
import { XMLBuilder } from "xmlbuilder2/lib/interfaces";
import { TABLE_HEADERS } from "../../constants/constant";
import { Employee } from "../../classes/Employee";

export function makePivotTable(employees: Employee[]): XMLBuilder {
  let pivotTable = create({
    encoding: "utf-8",
    standalone: "yes",
  })
    .ele("pivotTableDefinition", {
      xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
      name: "PivotTable1",
      cacheId: "1",
      dataCaption: "Values",
    })
    .ele("location", {
      ref: `A3:B${employees.length + 4}`,
      firstHeaderRow: "1",
      firstDataRow: "1",
      firstDataCol: "1",
    })
    .up()
    .ele("pivotFields", { count: `${TABLE_HEADERS.length}` })
    .ele("pivotField", { showAll: "0" })
    .up()
    .ele("pivotField", { showAll: "0" })
    .up()
    .ele("pivotField", { showAll: "0" })
    .up()
    .ele("pivotField", { showAll: "0" })
    .up()
    .ele("pivotField", { showAll: "0", axis: "axisRow" })
    .ele("items", { count: `${employees.length + 1}` });

  for (let i = 0; i < employees.length; i++) {
    makePivotFieldItem(pivotTable, i);
  }

  pivotTable = pivotTable
    .ele("item", { t: "default" })
    .up()
    .up()
    .up()
    .ele("pivotField", { showAll: "0" })
    .up()
    .ele("pivotField", { showAll: "0" })
    .up()
    .ele("pivotField", { dataField: "1", showAll: "0" })
    .up()
    .up()
    .ele("rowFields", { count: "1" })
    .ele("field", { x: "4" })
    .up()
    .up()
    .ele("rowItems", { count: `${employees.length + 1}` });

  for (let i = 0; i < employees.length; i++) {
    makeRowItem(pivotTable, i);
  }

  pivotTable = pivotTable
    .ele("i", { t: "grand" })
    .ele("x")
    .up()
    .up()
    .up()
    .ele("dataFields", { count: "1" })
    .ele("dataField", {
      name: "Sum of Man-Hours",
      fld: "7",
      baseField: "0",
      baseItem: "0",
    })
    .up()
    .up()
    .ele("pivotTableStyleInfo", {
      name: "PivotStyleLight16",
      showRowHeaders: "1",
      showColHeaders: "1",
      showRowStripes: "0",
      showColStripes: "0",
      showLastColumn: "1",
    })
    .up();
  return pivotTable;
}

function makeRowItem(xml: XMLBuilder, index: number) {
  xml.ele("i").ele("x", { v: `${index}` });
}

function makePivotFieldItem(xml: XMLBuilder, index: number) {
  xml.ele("item", { x: `${index}` });
}
