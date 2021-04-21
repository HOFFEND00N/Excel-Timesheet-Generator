import { TableData } from "../classes/TableData";

export function makeEmployeeDataRows(tableData: TableData) {
  const dataArr: string[][] = [];
  for (let i = 0; i < tableData.employees?.length; i++) {
    const rowArr: string[] = [];
    for (const tableDataKey in tableData) {
      if (tableDataKey != "employees") rowArr.push(tableData[tableDataKey]);
    }
    rowArr.push(tableData.employees[i]);
    dataArr.push(rowArr);
  }
  return dataArr;
}
