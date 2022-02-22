import { isTeamsConfigValid } from "../isTeamsConfigValid";

test("should return false, when teams field is missing", () => {
  expect(isTeamsConfigValid()).toBe(false);
});

test("should return false, when teams count is 0", () => {
  expect(isTeamsConfigValid([])).toBe(false);
});

test("should return false, when teamlead is not provided", () => {
  expect(isTeamsConfigValid([{}])).toBe(false);
});

test("should return false, when employees field is missing", () => {
  expect(isTeamsConfigValid([{ teamLead: { jiraUsername: "a", lastName: "a", firstName: "b" } }])).toBe(false);
});

test("should return false, when 0 employees inside team", () => {
  expect(isTeamsConfigValid([{ teamLead: { jiraUsername: "a", lastName: "a", firstName: "b" }, employees: [] }])).toBe(
    false
  );
});

test("should return false, when employee with missing field inside team", () => {
  expect(
    isTeamsConfigValid([{ teamLead: { jiraUsername: "a", lastName: "a", firstName: "b" }, employees: [{}] }])
  ).toBe(false);
});

test("should return false, when employee with missing field inside team", () => {
  expect(
    isTeamsConfigValid([{ teamLead: { jiraUsername: "a", lastName: "a", firstName: "b" }, employees: [{}] }])
  ).toBe(false);
});

test("should return false, when companyCode field is missing", () => {
  expect(
    isTeamsConfigValid([
      {
        teamLead: { jiraUsername: "a", lastName: "a", firstName: "b" },
        employees: [{ lastName: "a", firstName: "b", jiraUsername: "a" }],
      },
    ])
  ).toBe(false);
});

test("should return false, when unit field is missing", () => {
  expect(
    isTeamsConfigValid([
      {
        teamLead: { jiraUsername: "a", lastName: "a", firstName: "b" },
        employees: [{ lastName: "a", firstName: "b", jiraUsername: "a" }],
        companyCode: "a",
      },
    ])
  ).toBe(false);
});

test("should return false, when product field is missing", () => {
  expect(
    isTeamsConfigValid([
      {
        teamLead: { jiraUsername: "a", lastName: "a", firstName: "b" },
        employees: [{ lastName: "a", firstName: "b", jiraUsername: "a" }],
        unit: 1,
        companyCode: "a",
      },
    ])
  ).toBe(false);
});

test("should return false, when project field is missing", () => {
  expect(
    isTeamsConfigValid([
      {
        teamLead: { jiraUsername: "a", lastName: "a", firstName: "b" },
        employees: [{ lastName: "a", firstName: "b", jiraUsername: "a" }],
        unit: 1,
        companyCode: "a",
        product: "a",
      },
    ])
  ).toBe(false);
});

test("should return false, when fileNameTemplate field is missing", () => {
  expect(
    isTeamsConfigValid([
      {
        teamLead: { jiraUsername: "a", lastName: "a", firstName: "b" },
        employees: [{ lastName: "a", firstName: "b", jiraUsername: "a" }],
        unit: 1,
        companyCode: "a",
        project: "a",
        product: "a",
      },
    ])
  ).toBe(false);
});

test("should return true, when all fields are passed", () => {
  expect(
    isTeamsConfigValid([
      {
        teamLead: { jiraUsername: "a", lastName: "a", firstName: "b" },
        employees: [{ lastName: "a", firstName: "b", jiraUsername: "a" }],
        unit: 1,
        companyCode: "a",
        project: "a",
        product: "a",
        fileNameTemplate: "a",
      },
    ])
  ).toBe(true);
});
