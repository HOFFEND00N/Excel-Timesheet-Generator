import { convertNumberToExcelColumn } from "../convertNumberToExcelColumn";

test("pass 1 expect to return A", () => {
  expect(convertNumberToExcelColumn(1)).toEqual("A");
});

test("pass 26 expect to return Z", () => {
  expect(convertNumberToExcelColumn(26)).toEqual("Z");
});

test("pass 27 expect to return AA", () => {
  expect(convertNumberToExcelColumn(27)).toEqual("AA");
});

test("pass 52 expect to return AZ", () => {
  expect(convertNumberToExcelColumn(52)).toEqual("AZ");
});

test("pass 520 expect to return SZ", () => {
  expect(convertNumberToExcelColumn(520)).toEqual("SZ");
});

test("pass 2600 expect to return CUZ", () => {
  expect(convertNumberToExcelColumn(2600)).toEqual("CUZ");
});

test("pass 10000 expect to return NTP", () => {
  expect(convertNumberToExcelColumn(10000)).toEqual("NTP");
});
