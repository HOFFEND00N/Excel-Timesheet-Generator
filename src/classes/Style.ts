import { HorizontalAlignTextWays } from "../constants/styleConstants";

interface Font {
  bold?: boolean;
  size?: number;
  name?: string;
}

interface Border {
  left?: BorderStyle;
  right?: BorderStyle;
  top?: BorderStyle;
  bottom?: BorderStyle;
}

interface BorderStyle {
  style?: string;
}

interface Background {
  type?: string;
  patternType?: string;
  fgColor?: string;
}

interface Alignment {
  horizontal?: HorizontalAlignTextWays;
}

export interface Style {
  font?: Font;
  border?: Border;
  fill?: Background;
  alignment?: Alignment;
}
