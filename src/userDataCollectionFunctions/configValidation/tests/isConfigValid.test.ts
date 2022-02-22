import { isConfigValid } from "../isConfigValid";

test("should return false, when jiraTaskQueryField is missing", () => {
  expect(isConfigValid({})).toBe(false);
});

test("should return false, when teams field is missing", () => {
  expect(isConfigValid({ jiraTaskQuery: "a" })).toBe(false);
});

test("should return false, when working hours per month field is wrong type", () => {
  expect(isConfigValid({ workingHoursPerMonth: "1" })).toBe(false);
});

test("should return true, when all fields passed", () => {
  expect(
    isConfigValid({
      workingHoursPerMonth: 1,
      jiraTaskQuery: "a",
      teams: [
        {
          teamLead: { jiraUsername: "a", lastName: "a", firstName: "b" },
          employees: [{ firstName: "a", lastName: "b", jiraUsername: "a" }],
          unit: 1,
          companyCode: "a",
          project: "a",
          product: "a",
          fileNameTemplate: "a",
        },
      ],
    })
  ).toBe(true);
});
