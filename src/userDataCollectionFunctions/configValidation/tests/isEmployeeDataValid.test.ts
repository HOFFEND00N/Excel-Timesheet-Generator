import { isEmployeeDataValid } from "../isEmployeeDataValid";

test("should return false, when no employee passed", () => {
  expect(false).toBe(isEmployeeDataValid());
});

test("should return false, when jiraUsername is missing", () => {
  expect(false).toBe(isEmployeeDataValid({ name: "a" }));
});

test("should return false, when name is missing", () => {
  expect(false).toBe(isEmployeeDataValid({ jiraUsername: "a" }));
});

test("should return false, when name is missing", () => {
  expect(false).toBe(isEmployeeDataValid({ jiraUsername: "a", name: "a", workingHoursPerMonth: "1" }));
});

test("should return true, when name and jiraUsername present", () => {
  expect(true).toBe(isEmployeeDataValid({ jiraUsername: "a", name: "a" }));
});
