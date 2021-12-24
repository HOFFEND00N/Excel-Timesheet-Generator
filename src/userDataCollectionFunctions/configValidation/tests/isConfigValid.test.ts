import { isConfigValid } from "../isConfigValid";

test("should return false, when jiraTaskQueryField is missing", () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(false).toBe(isConfigValid({}));
});

test("should return false, when teams field is missing", () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(false).toBe(isConfigValid({ jiraTaskQuery: "a" }));
});

test("should return true, when all fields passed", () => {
  expect(true).toBe(
    isConfigValid({
      workingHoursPerMonth: 1,
      jiraTaskQuery: "a",
      teams: [
        {
          teamLead: { jiraUsername: "a", name: "a" },
          employees: [{ name: "a", jiraUsername: "a" }],
          unit: 1,
          companyCode: "a",
          project: "a",
          product: "a",
          fileNameTemplate: "a",
        },
      ],
    })
  );
});
