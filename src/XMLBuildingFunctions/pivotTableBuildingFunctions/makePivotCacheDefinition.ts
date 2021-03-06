import { IEmployee } from "../../models/IEmployee";
import { START_TABLE_POINT, TABLE_HEADERS } from "../../constants/constant";
import { IPoint } from "../../models/IPoint";
import { convertNumberToExcelColumn } from "../../utils/convertNumberToExcelColumn";
import { CacheField, PivotCacheDefinition, SharedItem } from "../types";

export function makePivotCacheDefinition({
  employees,
  tableBottomRightPoint,
}: {
  employees: IEmployee[];
  tableBottomRightPoint: IPoint;
}) {
  const worksheetSourceRef =
    convertNumberToExcelColumn(START_TABLE_POINT.column) +
    START_TABLE_POINT.row +
    ":" +
    convertNumberToExcelColumn(tableBottomRightPoint.column) +
    tableBottomRightPoint.row;

  const pivotCacheDefinition: PivotCacheDefinition = {
    "@xmlns": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "@xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "@r:id": "rId1",
    cacheSource: {
      "@type": "worksheet",
      worksheetSource: {
        "@ref": worksheetSourceRef,
        "@sheet": "Monthly timesheet",
      },
    },
    cacheFields: { cacheField: [], "@count": TABLE_HEADERS.length },
  };
  makePivotCacheFields(pivotCacheDefinition, employees);

  return pivotCacheDefinition;
}

function makePivotCacheFields(pivotCacheDefinition: PivotCacheDefinition, employees: IEmployee[]) {
  for (const tableHeader of TABLE_HEADERS) {
    if (tableHeader.label === "Employee")
      pivotCacheDefinition.cacheFields.cacheField.push(makePivotCacheFieldEmployees(employees, tableHeader.label));
    else
      pivotCacheDefinition.cacheFields.cacheField.push({
        "@name": tableHeader.label,
        sharedItems: {},
        "@numFmtId": "0",
      });
  }
  return;
}

function makePivotCacheFieldEmployees(employees: IEmployee[], name: string) {
  const cacheField: CacheField = {
    "@name": name,
    "@numFmtId": "0",
    sharedItems: {
      "@count": employees.length,
      s: makePivotCacheFieldSharedItems(employees),
    },
  };
  return cacheField;
}

function makePivotCacheFieldSharedItems(employees: IEmployee[]) {
  const sharedItems: SharedItem[] = [];
  for (const employee of employees) {
    sharedItems.push({ "@v": `${employee.lastName} ${employee.firstName}` });
  }
  return sharedItems;
}
