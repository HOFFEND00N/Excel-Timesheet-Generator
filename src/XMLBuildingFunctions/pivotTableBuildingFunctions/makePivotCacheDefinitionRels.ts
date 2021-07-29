import { create } from "xmlbuilder2";
import { XMLBuilder } from "xmlbuilder2/lib/interfaces";

export function makePivotCacheDefinitionRels(): XMLBuilder {
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
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/pivotCacheRecords",
      Target: "pivotCacheRecords1.xml",
    });
}
