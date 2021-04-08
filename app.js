const excel = require('excel4node');
const fs = require('fs');

const worksheetName = 'Monthly timesheet';
const tableHeaders = ['Unit', 'Interco', 'Product', 'Project', 'Employee', 'Task', 'Over-Time', 'Man-Hours'];
const monthHeaderName = 'Monthly Timesheet for';
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const startTablePoint = {y:8, x:2};
const startMonthHeaderPoint = {y:5, x:2};

let tableData = JSON.parse(fs.readFileSync('tableData.json', 'utf-8'));
let workbook = new excel.Workbook();
let worksheet = workbook.addWorksheet(worksheetName);

// may be style decorator pattern?
// inheritance?

// use method to create styles(alignment example)
// or hardcode it
const boldCellTextStyle = workbook.createStyle({
    font: {
        bold: true,
        name: 'arial',
        size: 10,
    },
});
const cellBorderStyle = workbook.createStyle({
    border:{
        left: {
            style: 'thin',
        },
        right: {
            style: 'thin',
        },
        top: {
            style: 'thin',
        },
        bottom: {
            style: 'thin',
        },
    },
});
const cellTextStyle = workbook.createStyle({
    font: {
        name: 'arial',
        size: 10,
    },
});
const yellowBackgroundStyle = workbook.createStyle({
    fill :{
        type: 'pattern',
        patternType: 'solid',
        fgColor : 'FFE699',
    },
    font: {
        name: 'arial',
        size: 10,
    },
});

function makeStyleHorizontalAlignText(way){
    return workbook.createStyle({
        alignment:{
            horizontal: way,
        },
    });
}

makeTable(startTablePoint);
workbook.write('Excel.xlsx');

function makeTable(startPoint) {
    const today = new Date();
    makeMonthCells(startMonthHeaderPoint, today);
    worksheet.addImage({
        type: 'picture',
        path: 'images/confirmit.jpg',
        position:{
            type: 'absoluteAnchor',
            x: '1in',
            y: '0.3in',
        },
    });

    styleTableCells(cellBorderStyle);
    makeTableRow(startPoint, tableHeaders, boldCellTextStyle);
    startPoint.y++;
    for (const row of tableData) {
        makeTableRow(startPoint ,row, cellTextStyle);
        startPoint.y++;
    }
}

function makeMonthCells(startPoint, curDate) {
    worksheet.cell(startPoint.y, startPoint.x).string(monthHeaderName).style(boldCellTextStyle);

    worksheet.cell(++startPoint.y, startPoint.x)
        .string(monthNames[curDate.getMonth()])
        .style(yellowBackgroundStyle)
        .style(makeStyleHorizontalAlignText('right'));

    worksheet.cell(startPoint.y, ++startPoint.x)
        .number(curDate.getFullYear())
        .style(yellowBackgroundStyle)
        .style(makeStyleHorizontalAlignText('left'));
}

function styleTableCells(cellStyle) {
    for (let x = 0; x < tableHeaders.length; x++) {
        for (let y = 0; y < tableData.length + 1; y++) {
            worksheet.cell(startTablePoint.y + y, startTablePoint.x + x).style(cellStyle);
        }
    }
}

function makeTableRow(startPoint, row, cellStyle) {
    let i = 0;
    for (const cell of row) {
        worksheet.cell(startPoint.y, startPoint.x + i++).string(cell).style(cellStyle);
    }
}
