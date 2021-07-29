import { create } from "xmlbuilder2";

export function makeWorkbookRels() {
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
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
      Target: "worksheets/sheet1.xml",
    })
    .up()
    .ele("Relationship", {
      Id: "rId2",
      Type:
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
      Target: "worksheets/sheet2.xml",
    })
    .up()
    .ele("Relationship", {
      Id: "rId3",
      Type:
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/pivotCacheDefinition",
      Target: "pivotCache/pivotCacheDefinition1.xml",
    })
    .up()
    .ele("Relationship", {
      Id: "rId4",
      Type:
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
      Target: "styles.xml",
    })
    .up()
    .ele("Relationship", {
      Id: "rId5",
      Type:
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
      Target: "sharedStrings.xml",
    })
    .up();
}
