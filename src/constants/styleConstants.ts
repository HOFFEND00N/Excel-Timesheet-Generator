import excel from "excel4node";
//may be return just {
//     font: {
//       bold: true,
//     },
//   }
// and this will be my own type by which i will build this:
// new excel.Workbook().createStyle({my own type})
export function makeBoldCellTextStyle() {
  return new excel.Workbook().createStyle({
    font: {
      bold: true,
    },
  });
}
export function makeCellBorderStyle() {
  return new excel.Workbook().createStyle({
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

export function makeYellowBackgroundStyle() {
  return new excel.Workbook().createStyle({
    fill: {
      type: "pattern",
      patternType: "solid",
      fgColor: "FFE699",
    },
  });
}

export function makeStyleHorizontalAlignText(way) {
  return new excel.Workbook().createStyle({
    alignment: {
      horizontal: way,
    },
  });
}

export function makeDefaultTextStyle() {
  return new excel.Workbook().createStyle({
    font: {
      size: 10,
      name: "Arial",
    },
  });
}
