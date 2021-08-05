export type Worksheet = {
  "@xmlns": string;
  dimension: Dimension;
  sheetFormatPr: SheetFormatPr;
  cols: Cols;
  sheetData: SheetData;
};

export type Dimension = {
  "@ref": string;
};

export type SheetFormatPr = {
  "@defaultRowHeight": number;
};

export type Cols = {
  col: Col[];
};

export type Col = {
  "@width": number;
  "@bestFit": boolean;
  "@min": number;
  "@max": number;
  "@customWidth": boolean;
};

export type SheetData = {
  row: Row[];
};

export type Row = {
  "@r": number;
  c: C[];
};

export type C = {
  "@r": string;
  "@t"?: string;
  v: string;
};
