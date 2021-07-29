import { create } from "xmlbuilder2";
import { XMLBuilder } from "xmlbuilder2/lib/interfaces";

export function makeWorkbook(): XMLBuilder {
  return create({ encoding: "utf-8", standalone: "yes" })
    .ele("workbook", {
      xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
      "xmlns:r":
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    })
    .ele("workbookPr", { defaultThemeVersion: "166925" })
    .up()
    .ele("bookViews")
    .ele("workbookView")
    .up()
    .up()
    .ele("sheets")
    .ele("sheet", { name: "Monthly timesheet", sheetId: "2", "r:id": "rId1" })
    .up()
    .ele("sheet", { name: "Sheet1", sheetId: "1", "r:id": "rId2" })
    .up()
    .up()
    .ele("calcPr", { calcId: "0" })
    .up()
    .ele("pivotCaches")
    .ele("pivotCache", { cacheId: "1", "r:id": "rId3" });
}
