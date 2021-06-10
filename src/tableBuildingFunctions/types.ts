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

export type TableHeader = {
  label: string;
  dataKey: string;
};

export type JiraResponse = {
  issues: JiraIssue[];
};

type JiraIssue = {
  key: string;
};

export type FetchUserTasksArguments = {
  jiraUserName: string;
  login: string;
  password: string;
};

export type HoursByEmployees = Record<string, number>;
