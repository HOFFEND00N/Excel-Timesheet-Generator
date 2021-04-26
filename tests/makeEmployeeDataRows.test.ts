import { TableData } from "../src/classes/TableData";
import * as fs from "fs";
import { makeEmployeeDataRows } from "../src/tableBuildingFunctions/makeEmployeeDataRows";

test("make two dimensional array from parsed json, json file consist of predefined table values, expect table values", () => {
  const expectedTable = [
    [651, "NO", "Confirmit", "Studio", "Kachalov Alexey"],
    [651, "NO", "Confirmit", "Studio", "Kolokolenkina Natalia"],
    [651, "NO", "Confirmit", "Studio", "Kozlova Anna"],
    [651, "NO", "Confirmit", "Studio", "Pisarenko Dmitry"],
    [651, "NO", "Confirmit", "Studio", "Popov Sergey"],
    [651, "NO", "Confirmit", "Studio", "Protasov Ilya"],
    [651, "NO", "Confirmit", "Studio", "Sumatokhin Alexey"],
    [651, "NO", "Confirmit", "Studio", "Volyakov Dmitry"],
    [651, "NO", "Confirmit", "Studio", "Volyakova Kristina"],
  ];
  const tabledata: TableData = JSON.parse(
    fs.readFileSync("tableData.json", "utf-8")
  );

  const actualTable = makeEmployeeDataRows(tabledata);

  expect(actualTable).toEqual(expectedTable);
});

test("make table rows values, pass empty function parameter, expect empty table", () => {
  const expectedTable = [];

  const actualTable = makeEmployeeDataRows({
    employees: [],
    companyCode: "",
    companyName: "",
    unit: "",
    project: "",
  });

  expect(actualTable).toEqual(expectedTable);
});
