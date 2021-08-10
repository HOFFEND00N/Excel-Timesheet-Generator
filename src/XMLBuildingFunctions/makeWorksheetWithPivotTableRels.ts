import { Relationships } from "./types";

export function makeWorksheetWithPivotTableRels(): Relationships {
  return {
    "@xmlns": "http://schemas.openxmlformats.org/package/2006/relationships",
    Relationship: [
      {
        "@Id": "rId1",
        "@Type":
          "http://schemas.openxmlformats.org/officeDocument/2006/relationships/pivotTable",
        "@Target": "../pivotTables/pivotTable1.xml",
      },
    ],
  };
}
