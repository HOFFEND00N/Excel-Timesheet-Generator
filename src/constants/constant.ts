import { TableHeader } from "../tableBuildingFunctions/types";
import { Point } from "../classes/Point";

export function getWorksheetMonthlyTimesheetName(): string {
  return "Monthly timesheet";
}

export function getTableHeaders(): TableHeader[] {
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

export function getMontlyTimesheetHeader(): string {
  return "Monthly Timesheet for";
}

export function getMonthNames(monthIndex: number): string {
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

export function getStartTablePoint(): Point {
  return { column: 2, row: 8 };
}

export function getStartMonthHeaderPoint(): Point {
  return { column: 2, row: 5 };
}
