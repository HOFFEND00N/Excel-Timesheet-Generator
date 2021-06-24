import { generateReportFileName } from "../src/generateReportFileName";

test("pass may of 2021, expect to return fileName with month = 06", () => {
  const expectedFileName = "2021-06-007.xls";

  const actualFileName = generateReportFileName(new Date(2021, 5), "007");

  expect(actualFileName).toEqual(expectedFileName);
});

test("pass january of 2021, expect to return fileName with month = 01", () => {
  const expectedFileName = "2021-01-007.xls";

  const actualFileName = generateReportFileName(new Date(2021, 0), "007");

  expect(actualFileName).toEqual(expectedFileName);
});

test("pass december of 2020, expect to return fileName with month = 12", () => {
  const expectedFileName = "2020-12-007.xls";

  const actualFileName = generateReportFileName(new Date(2020, 11), "007");

  expect(actualFileName).toEqual(expectedFileName);
});
