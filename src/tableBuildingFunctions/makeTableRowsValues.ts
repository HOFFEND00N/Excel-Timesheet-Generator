import { TableData } from "../classes/TableData";

export function makeTableRowsValues(tableData: TableData) {
  let dataArr: string[][] = [];
  for (let i: number = 0; i < tableData.employees?.length; i++) {
    let rowArr: string[] = [];
    for (const tableDataKey in tableData) {
      if (tableDataKey != "employees") rowArr.push(tableData[tableDataKey]);
    }
    rowArr.push(tableData.employees[i]);
    dataArr.push(rowArr);
  }
  return dataArr;
}
