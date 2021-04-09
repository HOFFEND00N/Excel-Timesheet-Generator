import {
  makeBoldCellTextStyle,
  makeCellBorderStyle,
  makeCellTextStyle,
  makeStyleHorizontalAlignText,
  makeYellowBackgroundStyle,
} from "./styleConstants";
import {
  monthHeaderName,
  monthNames,
  startMonthHeaderPoint,
  startTablePoint,
  tableHeaders,
} from "./constant";

let workbook, worksheet, tabledata;
export function makeTable(startPoint, workBook, tableData) {
  tabledata = tableData;
  workbook = workBook;
  worksheet = workBook.sheets[0];
  const today = new Date();
  makeMonthCells(startMonthHeaderPoint, today);
  worksheet.addImage({
    type: "picture",
    path: "images/confirmit.jpg",
    position: {
      type: "absoluteAnchor",
      x: "1in",
      y: "0.3in",
    },
  });

  styleTableCells(makeCellBorderStyle(workbook));
  makeTableRow(startPoint, tableHeaders, makeBoldCellTextStyle(workbook));
  startPoint.y++;
  const rows = makeTableDataRows(tableData);
  for (const row of rows) {
    makeTableRow(startPoint, row, makeCellTextStyle(workbook));
    startPoint.y++;
  }
  return workbook;
}

function makeMonthCells(startPoint, curDate) {
  worksheet
    .cell(startPoint.y, startPoint.x)
    .string(monthHeaderName)
    .style(makeBoldCellTextStyle(workbook));

  worksheet
    .cell(++startPoint.y, startPoint.x)
    .string(monthNames[curDate.getMonth()])
    .style(makeYellowBackgroundStyle(workbook))
    .style(makeStyleHorizontalAlignText(workbook, "right"));

  worksheet
    .cell(startPoint.y, ++startPoint.x)
    .number(curDate.getFullYear())
    .style(makeYellowBackgroundStyle(workbook))
    .style(makeStyleHorizontalAlignText(workbook, "left"));
}

function styleTableCells(cellStyle) {
  for (let x = 0; x < tableHeaders.length; x++) {
    for (let y = 0; y < tabledata.Employees.length + 1; y++) {
      worksheet
        .cell(startTablePoint.y + y, startTablePoint.x + x)
        .style(cellStyle);
    }
  }
}

function makeTableRow(startPoint, row, cellStyle) {
  let i = 0;
  for (const cell of row) {
    worksheet
      .cell(startPoint.y, startPoint.x + i++)
      .string(cell)
      .style(cellStyle);
  }
}

function makeTableDataRows(tableData) {
  let dataArr = [];
  for (let i = 0; i < tableData.Employees.length; i++) {
    let rowArr = [];
    for (const tableDataKey in tableData) {
      if (!Array.isArray(tableData[tableDataKey]))
        rowArr.push(tableData[tableDataKey]);
    }
    rowArr.push(tableData.Employees[i]);
    dataArr.push(rowArr);
  }
  return dataArr;
}
