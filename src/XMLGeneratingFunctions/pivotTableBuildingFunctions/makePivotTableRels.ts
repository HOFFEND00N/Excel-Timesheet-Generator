import { create } from "xmlbuilder2";

export function makePivotTableRels() {
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
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/pivotCacheDefinition",
      Target: "../pivotCache/pivotCacheDefinition1.xml",
    });
}
