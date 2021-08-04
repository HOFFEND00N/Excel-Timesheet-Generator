export type ContentTypes = {
  "@xmlns": string;
  Default: Default[];
  Override: Override[];
};

export type Default = {
  "@ContentType": string;
  "@Extension": string;
};

export type Override = {
  "@ContentType": string;
  "@PartName": string;
};
