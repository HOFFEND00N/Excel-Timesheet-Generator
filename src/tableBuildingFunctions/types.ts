import { TableCell } from "../classes/TableCell";

export type StringCell = TableCell<StringValue>;
export type NumericCell = TableCell<NumberValue>;
export type CommonCell = StringCell | NumericCell;

export function isNumericCell(tableCell: CommonCell): tableCell is NumericCell {
  return typeof tableCell.value == "number";
}

export function isStringCell(tableCell: CommonCell): tableCell is StringCell {
  return typeof tableCell.value == "string";
}

export type NumberValue = number;
export type StringValue = string;
export type CommonValue = NumberValue | StringValue;

export type tableHeader = {
  label: string;
  dataKey: string;
};

export type jiraJSONfetchResult = {
  issues: jiraIssue[];
};

type jiraIssue = {
  key: string;
};
