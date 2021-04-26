export function getWorksheetMonthlyTimesheetName() {
  return "Monthly timesheet";
}

export function getTableHeaders() {
  return [
    "Unit",
    "Interco",
    "Product",
    "Project",
    "Employee",
    "Task",
    "Over-Time",
    "Man-Hours",
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

export const startTasksPoint = { y: 9, x: 7 };
export const jiraUserNames = ["AnnaKo"];
