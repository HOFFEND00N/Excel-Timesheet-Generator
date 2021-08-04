import { PivotCacheDefinitionRels } from "../../XlsxFileClasses/PivotCacheDefinitionRels";

export function makePivotCacheDefinitionRels(): PivotCacheDefinitionRels {
  return {
    "@xmlns": "http://schemas.openxmlformats.org/package/2006/relationships",
    Relationship: {
      "@Id": "rId1",
      "@Type":
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/pivotCacheRecords",
      "@Target": "pivotCacheRecords1.xml",
    },
  };
}
