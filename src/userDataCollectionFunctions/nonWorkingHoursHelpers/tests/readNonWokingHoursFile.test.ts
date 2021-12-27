import { readNonWorkingHoursFile } from "../readNonWorkingHoursFile";
import xlsx from "xlsx";

jest.mock("xlsx", () => ({
  readFile: () => {
    return {
      SheetNames: [""],
      Sheets: [""],
    };
  },
  utils: {
    sheet_to_json: jest.fn(),
  },
  WorkBook: {
    SheetNames: [""],
    Sheets: "",
  },
}));

test("should throw error, when file is incorrect", () => {
  (xlsx.utils.sheet_to_json as jest.Mock).mockImplementation(() => [[""]]);

  expect(readNonWorkingHoursFile).toThrowError("This is not the file with non working hours.");
});

test("should return data, when file is correct", () => {
  (xlsx.utils.sheet_to_json as jest.Mock).mockImplementation(() => [
    ["Unit", "Interco", "Product", "Project", "Employee", "Task", "Over-Time", "Man-Hours"],
  ]);

  expect(readNonWorkingHoursFile("")).toEqual([
    ["Unit", "Interco", "Product", "Project", "Employee", "Task", "Over-Time", "Man-Hours"],
  ]);
});
