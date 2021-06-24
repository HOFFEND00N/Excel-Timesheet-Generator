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
  fields: Fields;
};

type Fields = {
  customfield_10006: string;
};

export type FetchUserTasksArguments = {
  jiraUserName: string;
  login: string;
  password: string;
};

export type ParsedJiraResponse = {
  epicKey: string;
  taskKey: string;
};

export type HoursByEmployees = Record<string, number>;

export enum EmployeePosition {
  SoftwareEngineer = "Software engineer",
  TeamLead = "TeamLead",
}
