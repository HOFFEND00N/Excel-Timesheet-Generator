import { isEmployeeDataValid } from "../isEmployeeDataValid";

test("should return false, when no employee passed", () => {
  expect(isEmployeeDataValid()).toBe(false);
});

test("should return false, when jiraUsername is missing", () => {
  expect(isEmployeeDataValid({ name: "a" })).toBe(false);
});

test("should return false, when name is missing", () => {
  expect(isEmployeeDataValid({ jiraUsername: "a" })).toBe(false);
});

test("should return false, when name is missing", () => {
  expect(isEmployeeDataValid({ jiraUsername: "a", name: "a", workingHoursPerMonth: "1" })).toBe(false);
});

test("should return true, when name and jiraUsername present", () => {
  expect(isEmployeeDataValid({ jiraUsername: "a", name: "a" })).toBe(true);
});
