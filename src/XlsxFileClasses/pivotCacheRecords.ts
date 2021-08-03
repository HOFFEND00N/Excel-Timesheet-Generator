export type PivotCacheRecords = {
  "@xmlns": string;
  "@xmlns:r": string;
  "@count": string;
  r: PivotCacheRecord[];
};

export type PivotCacheRecord = {
  "#": PivotCacheRecordElement[];
};

export type PivotCacheRecordElement = {
  n?: PivotCacheRecordElementKeyValuePair;
  s?: PivotCacheRecordElementKeyValuePair;
  x?: PivotCacheRecordElementKeyValuePair;
};

export type PivotCacheRecordElementKeyValuePair = {
  "@v": string;
};
