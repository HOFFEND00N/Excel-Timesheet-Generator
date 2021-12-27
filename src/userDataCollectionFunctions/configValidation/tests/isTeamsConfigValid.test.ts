import { isTeamsConfigValid } from "../isTeamsConfigValid";

test("should return false, when teams field is missing", () => {
  expect(false).toBe(isTeamsConfigValid());
});

test("should return false, when teams count is 0", () => {
  expect(false).toBe(isTeamsConfigValid([]));
});

test("should return false, when teamlead is not provided", () => {
  expect(false).toBe(isTeamsConfigValid([{}]));
});

test("should return false, when employees field is missing", () => {
  expect(false).toBe(isTeamsConfigValid([{ teamLead: { jiraUsername: "a", name: "a" } }]));
});

test("should return false, when 0 employees inside team", () => {
  expect(false).toBe(isTeamsConfigValid([{ teamLead: { jiraUsername: "a", name: "a" }, employees: [] }]));
});

test("should return false, when employee with missing field inside team", () => {
  expect(false).toBe(isTeamsConfigValid([{ teamLead: { jiraUsername: "a", name: "a" }, employees: [{}] }]));
});

test("should return false, when employee with missing field inside team", () => {
  expect(false).toBe(isTeamsConfigValid([{ teamLead: { jiraUsername: "a", name: "a" }, employees: [{}] }]));
});

test("should return false, when companyCode field is missing", () => {
  expect(false).toBe(
    isTeamsConfigValid([{ teamLead: { jiraUsername: "a", name: "a" }, employees: [{ name: "a", jiraUsername: "a" }] }])
  );
});

test("should return false, when unit field is missing", () => {
  expect(false).toBe(
    isTeamsConfigValid([
      { teamLead: { jiraUsername: "a", name: "a" }, employees: [{ name: "a", jiraUsername: "a" }], companyCode: "a" },
    ])
  );
});

test("should return false, when product field is missing", () => {
  expect(false).toBe(
    isTeamsConfigValid([
      {
        teamLead: { jiraUsername: "a", name: "a" },
        employees: [{ name: "a", jiraUsername: "a" }],
        unit: 1,
        companyCode: "a",
      },
    ])
  );
});

test("should return false, when project field is missing", () => {
  expect(false).toBe(
    isTeamsConfigValid([
      {
        teamLead: { jiraUsername: "a", name: "a" },
        employees: [{ name: "a", jiraUsername: "a" }],
        unit: 1,
        companyCode: "a",
        product: "a",
      },
    ])
  );
});

test("should return false, when fileNameTemplate field is missing", () => {
  expect(false).toBe(
    isTeamsConfigValid([
      {
        teamLead: { jiraUsername: "a", name: "a" },
        employees: [{ name: "a", jiraUsername: "a" }],
        unit: 1,
        companyCode: "a",
        project: "a",
        product: "a",
      },
    ])
  );
});

test("should return true, when all fields are passed", () => {
  expect(true).toBe(
    isTeamsConfigValid([
      {
        teamLead: { jiraUsername: "a", name: "a" },
        employees: [{ name: "a", jiraUsername: "a" }],
        unit: 1,
        companyCode: "a",
        project: "a",
        product: "a",
        fileNameTemplate: "a",
      },
    ])
  );
});
