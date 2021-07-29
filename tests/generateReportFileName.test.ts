import { makeReportFileName } from "../src/makeReportFileName";

test("pass may of 2021, expect to return fileName with month = 06", () => {
  const expectedFileName = "2021-06-7.xlsx";

  const actualFileName = makeReportFileName(new Date(2021, 5), 7);

  expect(actualFileName).toEqual(expectedFileName);
});

test("pass january of 2021, expect to return fileName with month = 01", () => {
  const expectedFileName = "2021-01-7.xlsx";

  const actualFileName = makeReportFileName(new Date(2021, 0), 7);

  expect(actualFileName).toEqual(expectedFileName);
});

test("pass december of 2020, expect to return fileName with month = 12", () => {
  const expectedFileName = "2020-12-7.xlsx";

  const actualFileName = makeReportFileName(new Date(2020, 11), 7);

  expect(actualFileName).toEqual(expectedFileName);
});
