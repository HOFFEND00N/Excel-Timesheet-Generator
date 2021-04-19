import { TableData } from "../build/classes/TableData";
import * as fs from "fs";
import { makeTableRowsValues } from "../build/tableBuildingFunctions/makeTableRowsValues";

test("make two dimensional array from parsed json, json file consist of predefined table values, expect table values", () => {
  let expectedTable: Array<Array<string>> = [
    ["651", "NO", "Confirmit", "Studio", "Kachalov Alexey"],
    ["651", "NO", "Confirmit", "Studio", "Kolokolenkina Natalia"],
    ["651", "NO", "Confirmit", "Studio", "Kozlova Anna"],
    ["651", "NO", "Confirmit", "Studio", "Pisarenko Dmitry"],
    ["651", "NO", "Confirmit", "Studio", "Popov Sergey"],
    ["651", "NO", "Confirmit", "Studio", "Protasov Ilya"],
    ["651", "NO", "Confirmit", "Studio", "Sumatokhin Alexey"],
    ["651", "NO", "Confirmit", "Studio", "Volyakov Dmitry"],
    ["651", "NO", "Confirmit", "Studio", "Volyakova Kristina"],
  ];
  let tabledata: TableData = JSON.parse(
    fs.readFileSync("tableData.json", "utf-8")
  );

  let actualTable = makeTableRowsValues(tabledata);

  expect(actualTable).toEqual(expectedTable);
});

test("make table rows values, pass empty function parameter, expect empty table", () => {
  let expectedTable: Array<Array<string>> = [];
  let tabledata: TableData = new TableData("", "", "", "", []);

  let actualTable = makeTableRowsValues(tabledata);

  expect(actualTable).toEqual(expectedTable);
});
