export type Relationships = {
  "@xmlns": string;
  Relationship: Relationship[];
};

export type Relationship = {
  "@Id": string;
  "@Type": string;
  "@Target": string;
};
