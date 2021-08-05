import { Relationships } from "../../XlsxFileClasses";

export function makePivotCacheDefinitionRels(): Relationships {
  return {
    "@xmlns": "http://schemas.openxmlformats.org/package/2006/relationships",
    Relationship: [
      {
        "@Id": "rId1",
        "@Type":
          "http://schemas.openxmlformats.org/officeDocument/2006/relationships/pivotCacheRecords",
        "@Target": "pivotCacheRecords1.xml",
      },
    ],
  };
}
