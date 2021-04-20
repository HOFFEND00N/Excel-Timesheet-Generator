import { Style } from "../classes/Style";

export function makeBoldCellTextStyle(): Style {
  return {
    font: {
      bold: true,
    },
  };
}

export function makeCellBorderStyle(): Style {
  return {
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
  };
}

export function makeYellowBackgroundStyle(): Style {
  return {
    fill: {
      type: "pattern",
      patternType: "solid",
      fgColor: "FFE699",
    },
  };
}

export function makeStyleHorizontalAlignText(way): Style {
  return {
    alignment: {
      horizontal: way,
    },
  };
}

export function makeDefaultTextStyle(): Style {
  return {
    font: {
      size: 10,
      name: "Arial",
    },
  };
}
