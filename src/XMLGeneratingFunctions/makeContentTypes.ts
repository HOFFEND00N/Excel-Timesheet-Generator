import { XMLBuilder } from "xmlbuilder2/lib/interfaces";
import { create } from "xmlbuilder2";

export function makeContentTypes(): XMLBuilder {
  return create({
    encoding: "utf-8",
    standalone: "yes",
  })
    .ele("Types", {
      xmlns: "http://schemas.openxmlformats.org/package/2006/content-types",
    })
    .ele("Default", { ContentType: "image/jpeg", Extension: "jpg" })
    .up()
    .ele("Default", { ContentType: "application/xml", Extension: "xml" })
    .up()
    .ele("Default", {
      ContentType: "application/vnd.openxmlformats-package.relationships+xml",
      Extension: "rels",
    })
    .up()
    .ele("Override", {
      ContentType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
      PartName: "/xl/workbook.xml",
    })
    .up()
    .ele("Override", {
      ContentType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
      PartName: "/xl/worksheets/sheet1.xml",
    })
    .up()
    .ele("Override", {
      ContentType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
      PartName: "/xl/worksheets/sheet2.xml",
    })
    .up()
    .ele("Override", {
      ContentType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml",
      PartName: "/xl/pivotCache/pivotCacheDefinition1.xml",
    })
    .up()
    .ele("Override", {
      ContentType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml",
      PartName: "/xl/pivotCache/pivotCacheRecords1.xml",
    })
    .up()
    .ele("Override", {
      ContentType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
      PartName: "/xl/styles.xml",
    })
    .up()
    .ele("Override", {
      ContentType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
      PartName: "/xl/sharedStrings.xml",
    })
    .up()
    .ele("Override", {
      ContentType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml",
      PartName: "/xl/pivotTables/pivotTable1.xml",
    })
    .up()
    .ele("Override", {
      ContentType: "application/vnd.openxmlformats-officedocument.drawing+xml",
      PartName: "/xl/drawings/drawing1.xml",
    })
    .up()
    .ele("Override", {
      ContentType: "application/vnd.openxmlformats-package.core-properties+xml",
      PartName: "/docProps/core.xml",
    });
}
