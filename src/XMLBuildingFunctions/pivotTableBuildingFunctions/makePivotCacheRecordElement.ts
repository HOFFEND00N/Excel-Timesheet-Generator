import { CommonValue } from "../../tableBuildingFunctions/types";
import { Employee } from "../../classes/Employee";
import { PivotCacheRecordElement } from "../types";

export function makePivotCacheRecordElement({
  value,
  employees,
}: {
  value: CommonValue;
  employees: Employee[];
}): PivotCacheRecordElement {
  const employeeIndex = employees.findIndex((employee) => employee.name === value);
  if (employeeIndex !== -1) return { x: { "@v": `${employeeIndex}` } };
  if (typeof value === "number") return { n: { "@v": `${value}` } };
  return { s: { "@v": `${value}` } };
}
