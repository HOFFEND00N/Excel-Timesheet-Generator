export interface Font {
  bold?: boolean;
  size?: number;
  name?: string;
}

export interface Border {
  left?: BorderStyle;
  right?: BorderStyle;
  top?: BorderStyle;
  bottom?: BorderStyle;
}

export interface BorderStyle {
  style?: string;
}

export interface Background {
  type?: string;
  patternType?: string;
  fgColor?: string;
}

export interface Alignment {
  horizontal?: string;
}

export interface Style {
  font?: Font;
  border?: Border;
  fill?: Background;
  alignment?: Alignment;
}
