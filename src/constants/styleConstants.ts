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

export function makeStyleHorizontalAlignText(way: HorizontalAlignTextWays): Style {
  return {
    alignment: {
      horizontal: way,
    },
  };
}

export enum HorizontalAlignTextWays {
  center = "center",
  centerContinuous = "centerContinuous",
  distributed = "distributed",
  fill = "fill",
  general = "general",
  justify = "justify",
  left = "left",
  right = "right",
}

export function makeDefaultTextStyle(): Style {
  return {
    font: {
      size: 10,
      name: "Arial",
    },
  };
}
