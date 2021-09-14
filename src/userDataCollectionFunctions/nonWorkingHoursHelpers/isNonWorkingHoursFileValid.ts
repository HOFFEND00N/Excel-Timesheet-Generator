import { areArraysEqual } from "../../utils/areArraysEquals";
import { TABLE_HEADERS } from "../../constants/constant";

export function isNonWorkingHoursFileValid(file: string[][]) {
  return file.some((row) =>
    areArraysEqual(
      row,
      TABLE_HEADERS.map((header) => header.label)
    )
  );
}
