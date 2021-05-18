import { TableData } from "../classes/TableData";
import fs from "fs";

export function getWorksheetMonthlyTimesheetName() {
  return "Monthly timesheet";
}

export function getTableHeaders() {
  return [
    { label: "Unit", dataKey: "unit" },
    { label: "Interco", dataKey: "companyCode" },
    { label: "Product", dataKey: "companyName" },
    { label: "Project", dataKey: "project" },
    { label: "Employee", dataKey: "employee" },
    { label: "Task", dataKey: "task" },
    { label: "Over-Time", dataKey: "overTime" },
    { label: "Man-Hours", dataKey: "manHours" },
  ];
}

export function getMontlyTimesheetHeader() {
  return "Monthly Timesheet for";
}

export function getMonthNames(monthIndex: number) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[monthIndex];
}

export function getStartTablePoint() {
  return { column: 2, row: 8 };
}

export function getStartMonthHeaderPoint() {
  return { column: 2, row: 5 };
}

export function getJiraUserNames() {
  const tabledata: TableData = JSON.parse(
    fs.readFileSync("tableData.json", "utf-8")
  );
  const jirauserNames: string[] = [];
  for (const employee of tabledata.employees) {
    jirauserNames.push(employee.jiraUsername);
  }
  return jirauserNames;
}
