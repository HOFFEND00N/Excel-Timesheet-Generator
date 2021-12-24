import { IPoint } from "../models/IPoint";

export const WORKSHEET_MONTHLY_TIMESHEET_NAME = "Monthly timesheet";

export const TABLE_HEADERS = [
  { label: "Unit", dataKey: "unit" },
  { label: "Interco", dataKey: "companyCode" },
  { label: "Product", dataKey: "product" },
  { label: "Project", dataKey: "project" },
  { label: "Employee", dataKey: "employee" },
  { label: "Task", dataKey: "task" },
  { label: "Over-Time", dataKey: "overTime" },
  { label: "Man-Hours", dataKey: "manHours" },
];

export const MONTHLY_TIMESHEET_HEADER = "Monthly Timesheet for";

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const START_TABLE_POINT: IPoint = { column: 2, row: 8 };

export const START_MONTH_HEADER_POINT: IPoint = { column: 2, row: 5 };

export const OUTPUT_FORMAT_ARRAY_OF_ARRAYS = 1;

export const ENGLISH_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const EPIC_KEY = "customfield_10006";

export const TASKS_STATUSES = [
  "In Progress",
  "In Code Review",
  "IN QA",
  "QA Verified",
  "Investigation",
  "Code Completed",
];

export const LINE_BREAK = "------------------------------";
