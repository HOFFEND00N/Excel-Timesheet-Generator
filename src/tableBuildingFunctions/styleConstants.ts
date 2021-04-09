export function makeBoldCellTextStyle(workbook) {
  return workbook.createStyle({
    font: {
      bold: true,
      name: "arial",
      size: 10,
    },
  });
}

export function makeCellBorderStyle(workbook) {
  return workbook.createStyle({
    border: {
      left: {
        style: "thin",
      },
      right: {
        style: "thin",
      },
      top: {
        style: "thin",
      },
      bottom: {
        style: "thin",
      },
    },
  });
}

export function makeCellTextStyle(workbook) {
  return workbook.createStyle({
    font: {
      name: "arial",
      size: 10,
    },
  });
}

export function makeYellowBackgroundStyle(workbook) {
  return workbook.createStyle({
    fill: {
      type: "pattern",
      patternType: "solid",
      fgColor: "FFE699",
    },
    font: {
      name: "arial",
      size: 10,
    },
  });
}

export function makeStyleHorizontalAlignText(workbook, way) {
  return workbook.createStyle({
    alignment: {
      horizontal: way,
    },
  });
}
