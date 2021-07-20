import { CommonValue } from "../../tableBuildingFunctions/types";
import { XMLBuilder } from "xmlbuilder2/lib/interfaces";
import { Employee } from "../../classes/Employee";

export function makePivotRowValue(
  value: CommonValue,
  xml: XMLBuilder,
  employees: Employee[]
): XMLBuilder {
  const employeeIndex = employees.findIndex(
    (employee) => employee.name == value
  );
  if (employeeIndex != -1)
    return xml.ele("x", { v: employeeIndex.toString() }).up();
  if (typeof value == "string")
    return xml.ele("s", { v: value.toString() }).up();
  return xml.ele("n", { v: value.toString() }).up();
}
