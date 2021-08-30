import { IStyle } from "../models/IStyle";

export function makeBoldCellTextStyle(): IStyle {
  return {
    font: {
      bold: true,
    },
  };
}

export function makeCellBorderStyle(): IStyle {
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

export function makeYellowBackgroundStyle(): IStyle {
  return {
    fill: {
      type: "pattern",
      patternType: "solid",
      fgColor: "FFE699",
    },
  };
}

export function makeStyleHorizontalAlignText(way: HorizontalAlignTextWays): IStyle {
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

export function makeDefaultTextStyle(): IStyle {
  return {
    font: {
      size: 10,
      name: "Arial",
    },
  };
}
