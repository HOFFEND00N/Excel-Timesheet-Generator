import { HorizontalAlignTextWays } from "../constants/styleConstants";

interface IFont {
  bold?: boolean;
  size?: number;
  name?: string;
}

interface IBorder {
  left?: IBorderStyle;
  right?: IBorderStyle;
  top?: IBorderStyle;
  bottom?: IBorderStyle;
}

interface IBorderStyle {
  style?: string;
}

interface IBackground {
  type?: string;
  patternType?: string;
  fgColor?: string;
}

interface IAlignment {
  horizontal?: HorizontalAlignTextWays;
}

export interface IStyle {
  font?: IFont;
  border?: IBorder;
  fill?: IBackground;
  alignment?: IAlignment;
}
