import { isNonWorkingHoursFileValid } from "../isNonWorkingHoursFileValid";

test("pass empty file, expect to return false", () => {
  const expected = false;

  const actual = isNonWorkingHoursFileValid([]);

  expect(actual).toEqual(expected);
});

test("pass file with wrong data, expect to return false", () => {
  const expected = false;

  const actual = isNonWorkingHoursFileValid([
    ["abc", "asd"],
    ["asd", "aasdsd"],
  ]);

  expect(actual).toEqual(expected);
});

test("pass file with correct data, expect to return true", () => {
  const expected = true;

  const actual = isNonWorkingHoursFileValid([
    ["Unit", "Interco", "Product", "Project", "Employee", "Task", "Over-Time", "Man-Hours"],
    ["1", "EU", "DaysOff", "Holidays", "Karaseva Svetlana", "01.07.2021", "", "8"],
  ]);

  expect(actual).toEqual(expected);
});
