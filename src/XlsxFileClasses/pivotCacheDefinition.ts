export type PivotCacheDefinition = {
  "@xmlns": string;
  "@xmlns:r": string;
  "@r:id": string;
  cacheSource: CacheSource;
  cacheFields: CacheFields;
};

type CacheSource = {
  "@type": string;
  worksheetSource: WorksheetSource;
};

type WorksheetSource = {
  "@ref": string;
  "@sheet": string;
};

type CacheFields = {
  "@count": number;
  cacheField: CacheField[];
};

export type CacheField = {
  "@name": string;
  "@numFmtId": string;
  sharedItems: SharedItems;
};

export type SharedItems = {
  "@count"?: number;
  s?: SharedItem[];
};

export type SharedItem = {
  "@v"?: string;
};
