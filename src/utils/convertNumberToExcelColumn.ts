import { ENGLISH_ALPHABET } from "../constants/constant";

export function convertNumberToExcelColumn(value: number) {
  let excelColumn = "";
  while (value > 0) {
    value -= 1;
    const module = value % ENGLISH_ALPHABET.length;
    value = Math.floor(value / ENGLISH_ALPHABET.length);
    excelColumn = ENGLISH_ALPHABET[module].concat(excelColumn);
  }
  return excelColumn;
}
