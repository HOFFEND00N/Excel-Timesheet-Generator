import { isEmployeeDataValid } from "../isEmployeeDataValid";

test("should return false, when no employee passed", () => {
  expect(isEmployeeDataValid()).toBe(false);
});

test("should return false, when jiraUsername is missing", () => {
  expect(isEmployeeDataValid({ firstName: "a", lastName: "b" })).toBe(false);
});

test("should return false, when firstName is missing", () => {
  expect(isEmployeeDataValid({ jiraUsername: "a" })).toBe(false);
});

test("should return false, when lastName is missing", () => {
  expect(isEmployeeDataValid({ jiraUsername: "a", firstName: "a" })).toBe(false);
});

test("should return false, when workingHoursPerMonth is wrong type", () => {
  expect(isEmployeeDataValid({ jiraUsername: "a", firstName: "a", lastName: "b", workingHoursPerMonth: "1" })).toBe(
    false
  );
});

test("should return true, when name and jiraUsername present", () => {
  expect(isEmployeeDataValid({ jiraUsername: "a", firstName: "a", lastName: "b", workingHoursPerMonth: 1 })).toBe(true);
});
