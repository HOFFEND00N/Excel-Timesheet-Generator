export type Worksheet = {
  "@xmlns": string;
  dimension: Dimension;
  sheetFormatPr: SheetFormatProperties;
  cols: Columns;
  sheetData: SheetData;
};

export type Dimension = {
  "@ref": string;
};

export type SheetFormatProperties = {
  "@defaultRowHeight": number;
};

export type Columns = {
  col: Column[];
};

export type Column = {
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
  c: Cell[];
};

export type Cell = {
  "@r": string;
  "@t"?: string;
  v: string | number;
};
