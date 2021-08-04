import { SharedItem } from "./PivotCacheDefinition";

export type PivotTableDefinition = {
  "@xmlns": string;
  "@name": string;
  "@cacheId": string;
  "@dataCaption": string;
  location: Location;
  pivotFields: PivotFields;
  rowFields: RowFields;
  rowItems: RowItems;
  dataFields: DataFields;
  pivotTableStyleInfo: PivotTableStyleInfo;
};

export type Location = {
  "@ref": string;
  "@firstHeaderRow": number;
  "@firstDataRow": number;
  "@firstDataCol": number;
};

export type PivotFields = {
  "@count": number;
  pivotField: PivotField[];
};

export type PivotField = {
  "@showAll": string;
  "@dataField"?: string;
  "@axis"?: string;
  items?: Items;
};

export type Items = {
  "@count": number;
  item: Item[];
};

export type Item = {
  "@x"?: string;
  "@t"?: string;
};

export type RowFields = {
  "@count": number;
  field: Field;
};

export type Field = {
  "@x": number;
};

export type RowItems = {
  "@count": number;
  i: RowItem[];
};

export type RowItem = {
  "@t"?: string;
  x: SharedItem;
};

export type DataFields = {
  "@count": number;
  dataField: DataField;
};

export type DataField = {
  "@name": string;
  "@fld": number;
  "@baseField": string;
  "@baseItem": string;
};

export type PivotTableStyleInfo = {
  "@name": string;
  "@showRowHeaders": boolean;
  "@showColHeaders": boolean;
  "@showRowStripes": boolean;
  "@showColStripes": boolean;
  "@showLastColumn": boolean;
};
