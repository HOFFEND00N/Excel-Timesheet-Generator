import { TableData } from "../classes/TableData";
import { CommonValue } from "./types";
import { getTableHeaders } from "../constants/constant";

export function makeEmployeeDataRows({
  tableData,
  headers,
}: {
  tableData: TableData;
  headers: CommonValue[];
}) {
  const tableHeaders = getTableHeaders();
  const dataArr: CommonValue[][] = [];
  for (let i = 0; i < tableData.employees.length; i++) {
    const rowArr: string[] = [];
    for (const header of headers) {
      const tableHeader = tableHeaders.find((item) => item.label == header);
      if (header != "Employee" && tableData[tableHeader.dataKey] != undefined)
        rowArr.push(tableData[tableHeader.dataKey]);
    }
    rowArr.push(tableData.employees[i].name);
    dataArr.push(rowArr);
  }
  return dataArr;
}
