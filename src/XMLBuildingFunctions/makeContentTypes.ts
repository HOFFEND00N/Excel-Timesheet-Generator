import { ContentTypes } from "./types";

export function makeContentTypes(): ContentTypes {
  return {
    "@xmlns": "http://schemas.openxmlformats.org/package/2006/content-types",
    Default: [
      {
        "@ContentType": "image/jpeg",
        "@Extension": "jpg",
      },
      {
        "@ContentType": "application/xml",
        "@Extension": "xml",
      },
      {
        "@ContentType":
          "application/vnd.openxmlformats-package.relationships+xml",
        "@Extension": "rels",
      },
    ],
    Override: [
      {
        "@ContentType":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
        "@PartName": "/xl/workbook.xml",
      },
      {
        "@ContentType":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
        "@PartName": "/xl/worksheets/sheet1.xml",
      },
      {
        "@ContentType":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
        "@PartName": "/xl/worksheets/sheet2.xml",
      },
      {
        "@ContentType":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml",
        "@PartName": "/xl/pivotCache/pivotCacheDefinition1.xml",
      },
      {
        "@ContentType":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml",
        "@PartName": "/xl/pivotCache/pivotCacheRecords1.xml",
      },
      {
        "@ContentType":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
        "@PartName": "/xl/styles.xml",
      },
      {
        "@ContentType":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
        "@PartName": "/xl/sharedStrings.xml",
      },
      {
        "@ContentType":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml",
        "@PartName": "/xl/pivotTables/pivotTable1.xml",
      },
      {
        "@ContentType":
          "application/vnd.openxmlformats-officedocument.drawing+xml",
        "@PartName": "/xl/drawings/drawing1.xml",
      },
      {
        "@ContentType":
          "application/vnd.openxmlformats-package.core-properties+xml",
        "@PartName": "/docProps/core.xml",
      },
    ],
  };
}
