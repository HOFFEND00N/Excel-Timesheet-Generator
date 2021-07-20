import { create } from "xmlbuilder2";
import { XMLBuilder } from "xmlbuilder2/lib/interfaces";
import { TableData } from "../classes/TableData";

export function makeWorksheetWithPivotTable(
  tableData: TableData,
  workingHoursPerMonth: number
): XMLBuilder {
  const worksheet = create({
    encoding: "utf-8",
    standalone: "yes",
  })
    .ele("worksheet", {
      xmlns: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    })
    .ele("dimension", { ref: `A3:B${tableData.employees.length + 4}` })
    .up()
    .ele("sheetFormatPr", { defaultRowHeight: "15" })
    .up()
    .ele("cols")
    .ele("col", {
      width: "20",
      bestFit: "1",
      min: "1",
      max: "1",
      customWidth: "1",
    })
    .up()
    .ele("col", {
      width: "17.125",
      bestFit: "1",
      min: "2",
      max: "2",
      customWidth: "1",
    })
    .up()
    .up()
    .ele("sheetData")
    .ele("row", { r: "3" })
    .ele("c", { r: "A3", t: "str" })
    .ele("v")
    .txt("Row Labels")
    .up()
    .up()
    .ele("c", { r: "B3", t: "str" })
    .ele("v")
    .txt("Sum of Man-Hours")
    .up()
    .up()
    .up();

  for (let i = 0; i < tableData.employees.length; i++) {
    addRowSheetWithPivotTable({
      employeeName: tableData.employees[i].name,
      xml: worksheet,
      row: i + 4,
    });
  }

  worksheet
    .ele("row", { r: `${tableData.employees.length + 4}` })
    .ele("c", { r: `A${tableData.employees.length + 4}`, t: "str" })
    .ele("v")
    .txt("Grand Total")
    .up()
    .up()
    .ele("c", { r: `B${tableData.employees.length + 4}` })
    .ele("v")
    .txt(`${tableData.employees.length * workingHoursPerMonth}`)
    .up()
    .up()
    .up()
    .up()
    .ele("pageMargins", {
      left: "0.7",
      right: "0.7",
      top: "0.75",
      bottom: "0.75",
      header: "0.3",
      footer: "0.3",
    });

  return worksheet;
}

function addRowSheetWithPivotTable({
  employeeName,
  xml,
  row,
}: {
  employeeName: string;
  xml: XMLBuilder;
  row: number;
}): XMLBuilder {
  return xml
    .ele("row", { r: `${row}` })
    .ele("c", { r: `A${row}`, t: "str" })
    .ele("v")
    .txt(`${employeeName}`)
    .up()
    .up()
    .ele("c", { r: `B${row}` })
    .ele("v")
    .txt("120")
    .up()
    .up()
    .up();
}
