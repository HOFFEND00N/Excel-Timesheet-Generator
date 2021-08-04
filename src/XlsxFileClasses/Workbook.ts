export type Workbook = {
  "@xmlns": string;
  "@xmlns:r": string;
  workbookPr: WorkbookPr;
  sheets: Sheets;
  calcPr: CalcPr;
  pivotCaches: PivotCaches;
};

export type WorkbookPr = {
  "@defaultThemeVersion": number;
};

export type Sheets = {
  sheet: Sheet[];
};

export type Sheet = {
  "@name": string;
  "@sheetId": number;
  "@r:id": string;
};

export type CalcPr = {
  "@calcId": number;
};

export type PivotCaches = {
  pivotCache: PivotCache[];
};

export type PivotCache = {
  "@cacheId": number;
  "@r:id": string;
};
