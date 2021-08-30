import { TABLE_HEADERS } from "../../constants/constant";
import { IEmployee } from "../../models/IEmployee";
import { Item, PivotTableDefinition, RowItem } from "../types";

export function makePivotTable({
  employees,
  employeeColumnIndex,
  manHoursColumnIndex,
}: {
  employees: IEmployee[];
  employeeColumnIndex: number;
  manHoursColumnIndex: number;
}) {
  const pivotTable: PivotTableDefinition = {
    "@xmlns": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "@name": "PivotTable1",
    "@cacheId": "1",
    "@dataCaption": "Values",
    location: {
      "@ref": `A3:B${employees.length + 4}`,
      "@firstHeaderRow": 1,
      "@firstDataRow": 1,
      "@firstDataCol": 1,
    },
    pivotFields: {
      "@count": TABLE_HEADERS.length,
      pivotField: [
        {
          "@showAll": "0",
        },
        {
          "@showAll": "0",
        },
        {
          "@showAll": "0",
        },
        {
          "@showAll": "0",
        },
        {
          "@showAll": "0",
          "@axis": "axisRow",
          items: {
            "@count": employees.length + 1,
            item: makePivotFieldItems(employees.length),
          },
        },
        {
          "@showAll": "0",
        },
        {
          "@showAll": "0",
        },
        {
          "@showAll": "0",
          "@dataField": "1",
        },
      ],
    },
    rowFields: {
      "@count": 1,
      field: { "@x": employeeColumnIndex },
    },
    rowItems: {
      "@count": employees.length + 1,
      i: makeRowItems(employees.length),
    },
    dataFields: {
      "@count": 1,
      dataField: {
        "@name": "Sum of Man-Hours",
        "@fld": manHoursColumnIndex,
        "@baseField": "0",
        "@baseItem": "0",
      },
    },
    pivotTableStyleInfo: {
      "@name": "PivotStyleLight16",
      "@showRowHeaders": true,
      "@showColHeaders": true,
      "@showRowStripes": false,
      "@showColStripes": false,
      "@showLastColumn": true,
    },
  };

  return pivotTable;
}

function makePivotFieldItems(itemsCount: number) {
  const items: Item[] = [];
  for (let i = 0; i < itemsCount; i++) {
    items.push({ "@x": `${i}` });
  }
  items.push({ "@t": "default" });
  return items;
}

function makeRowItems(itemsCount: number) {
  const rowItems: RowItem[] = [];
  for (let i = 0; i < itemsCount; i++) {
    rowItems.push({ x: { "@v": `${i}` } });
  }
  rowItems.push({ "@t": "grand", x: {} });
  return rowItems;
}
