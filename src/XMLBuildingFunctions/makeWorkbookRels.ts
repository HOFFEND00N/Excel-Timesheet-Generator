import { Relationships } from "./types";

export function makeWorkbookRels(): Relationships {
  return {
    "@xmlns": "http://schemas.openxmlformats.org/package/2006/relationships",
    Relationship: [
      {
        "@Id": "rId1",
        "@Type": "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
        "@Target": "worksheets/sheet1.xml",
      },
      {
        "@Id": "rId2",
        "@Type": "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
        "@Target": "worksheets/sheet2.xml",
      },
      {
        "@Id": "rId3",
        "@Type": "http://schemas.openxmlformats.org/officeDocument/2006/relationships/pivotCacheDefinition",
        "@Target": "pivotCache/pivotCacheDefinition1.xml",
      },
      {
        "@Id": "rId4",
        "@Type": "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
        "@Target": "styles.xml",
      },
      {
        "@Id": "rId5",
        "@Type": "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
        "@Target": "sharedStrings.xml",
      },
    ],
  };
}
