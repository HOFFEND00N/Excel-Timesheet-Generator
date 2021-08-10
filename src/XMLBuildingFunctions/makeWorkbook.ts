import { Workbook } from "./types";

export function makeWorkbook(): Workbook {
  return {
    "@xmlns": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "@xmlns:r":
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    workbookPr: {
      "@defaultThemeVersion": 166925,
    },
    sheets: {
      sheet: [
        { "@name": "Monthly Timesheet", "@sheetId": 2, "@r:id": "rId1" },
        {
          "@name": "Sheet1",
          "@sheetId": 1,
          "@r:id": "rId2",
        },
      ],
    },
    calcPr: { "@calcId": 0 },
    pivotCaches: { pivotCache: [{ "@cacheId": 1, "@r:id": "rId3" }] },
  };
}
