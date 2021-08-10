import { Relationships } from "../types";

export function makePivotTableRels(): Relationships {
  return {
    "@xmlns": "http://schemas.openxmlformats.org/package/2006/relationships",
    Relationship: [
      {
        "@Id": "rId1",
        "@Type":
          "http://schemas.openxmlformats.org/officeDocument/2006/relationships/pivotCacheDefinition",
        "@Target": "../pivotCache/pivotCacheDefinition1.xml",
      },
    ],
  };
}
