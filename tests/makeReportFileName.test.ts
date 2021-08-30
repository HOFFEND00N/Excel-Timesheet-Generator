import { makeReportFileName } from "../src/makeReportFileName";

test("pass may of 2021, expect to return fileName with month = 06", () => {
  const expectedFileName = "2021-06-7.xlsx";

  const actualFileName = makeReportFileName({
    currentDate: new Date(2021, 5),
    companyUnit: 7,
    reportFileName: "${year}-${month}-${companyUnit}.xlsx",
  });

  expect(actualFileName).toEqual(expectedFileName);
});

test("pass january of 2021, expect to return fileName with month = 01", () => {
  const expectedFileName = "2021-01-7.xlsx";

  const actualFileName = makeReportFileName({
    currentDate: new Date(2021, 0),
    companyUnit: 7,
    reportFileName: "${year}-${month}-${companyUnit}.xlsx",
  });

  expect(actualFileName).toEqual(expectedFileName);
});

test("pass december of 2020, expect to return fileName with month = 12", () => {
  const expectedFileName = "2020-12-7.xlsx";

  const actualFileName = makeReportFileName({
    currentDate: new Date(2020, 11),
    companyUnit: 7,
    reportFileName: "${year}-${month}-${companyUnit}.xlsx",
  });

  expect(actualFileName).toEqual(expectedFileName);
});
