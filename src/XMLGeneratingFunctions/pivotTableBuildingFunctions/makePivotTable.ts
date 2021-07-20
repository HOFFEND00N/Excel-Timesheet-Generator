import { create } from "xmlbuilder2";
import { TableData } from "../../classes/TableData";
import { XMLBuilder } from "xmlbuilder2/lib/interfaces";

export function makePivotTable(tableData: TableData): XMLBuilder {
  return create({
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
      ref: `A3:B${tableData.employees.length + 4}`,
      firstHeaderRow: "1",
      firstDataRow: "1",
      firstDataCol: "1",
    })
    .up()
    .ele("pivotFields", { count: "8" })
    .ele("pivotField", { showAll: "0" })
    .up()
    .ele("pivotField", { showAll: "0" })
    .up()
    .ele("pivotField", { showAll: "0" })
    .up()
    .ele("pivotField", { showAll: "0" })
    .up()
    .ele("pivotField", { showAll: "0", axis: "axisRow" })
    .ele("items", { count: "10" })
    .ele("item", { x: "0" })
    .up()
    .ele("item", { x: "1" })
    .up()
    .ele("item", { x: "2" })
    .up()
    .ele("item", { x: "3" })
    .up()
    .ele("item", { x: "4" })
    .up()
    .ele("item", { x: "5" })
    .up()
    .ele("item", { x: "6" })
    .up()
    .ele("item", { x: "7" })
    .up()
    .ele("item", { x: "8" })
    .up()
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
    .ele("rowItems", { count: "10" })
    .ele("i")
    .ele("x")
    .up()
    .up()
    .ele("i")
    .ele("x", { v: "1" })
    .up()
    .up()
    .ele("i")
    .ele("x", { v: "2" })
    .up()
    .up()
    .ele("i")
    .ele("x", { v: "3" })
    .up()
    .up()
    .ele("i")
    .ele("x", { v: "4" })
    .up()
    .up()
    .ele("i")
    .ele("x", { v: "5" })
    .up()
    .up()
    .ele("i")
    .ele("x", { v: "6" })
    .up()
    .up()
    .ele("i")
    .ele("x", { v: "7" })
    .up()
    .up()
    .ele("i")
    .ele("x", { v: "8" })
    .up()
    .up()
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
}
