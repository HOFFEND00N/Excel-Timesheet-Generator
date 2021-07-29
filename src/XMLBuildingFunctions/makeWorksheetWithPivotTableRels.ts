import { create } from "xmlbuilder2";

export function makeWorksheetWithPivotTableRels() {
  return create({
    encoding: "utf-8",
    standalone: "yes",
  })
    .ele("Relationships", {
      xmlns: "http://schemas.openxmlformats.org/package/2006/relationships",
    })
    .ele("Relationship", {
      Id: "rId1",
      Type:
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/pivotTable",
      Target: "../pivotTables/pivotTable1.xml",
    });
}
