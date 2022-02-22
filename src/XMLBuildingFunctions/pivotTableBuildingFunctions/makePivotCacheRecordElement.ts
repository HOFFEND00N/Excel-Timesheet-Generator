import { CommonValue } from "../../tableBuildingFunctions/types";
import { IEmployee } from "../../models/IEmployee";
import { PivotCacheRecordElement } from "../types";

export function makePivotCacheRecordElement({
  value,
  employees,
}: {
  value: CommonValue;
  employees: IEmployee[];
}): PivotCacheRecordElement {
  const employeeIndex = employees.findIndex((employee) => `${employee.lastName} ${employee.firstName}` === value);
  if (employeeIndex !== -1) return { x: { "@v": `${employeeIndex}` } };
  if (typeof value === "number") return { n: { "@v": `${value}` } };
  return { s: { "@v": `${value}` } };
}
