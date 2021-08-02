export type PivotCacheDefinitionRels = {
  "@xmlns": string;
  Relationship: Relationship;
};

export type Relationship = {
  "@Id": string;
  "@Type": string;
  "@Target": string;
};
