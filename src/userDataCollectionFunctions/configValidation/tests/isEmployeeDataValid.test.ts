import { isEmployeeDataValid } from "../isEmployeeDataValid";

test("should return false, when no employee passed", () => {
  expect(false).toBe(isEmployeeDataValid());
});

test("should return false, when jiraUsername is missing", () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(false).toBe(isEmployeeDataValid({ name: "a" }));
});

test("should return false, when name is missing", () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(false).toBe(isEmployeeDataValid({ jiraUsername: "a" }));
});

test("should return true, when name and jiraUsername present", () => {
  expect(true).toBe(isEmployeeDataValid({ jiraUsername: "a", name: "a" }));
});
