import { areArraysEqual } from "../areArraysEquals";

test("pass empty array and array with values, expect to return false", () => {
  const expected = false;

  const actual = areArraysEqual([], [1, 2]);

  expect(actual).toEqual(expected);
});

test("pass two empty arrays, expect to return true", () => {
  const expected = true;

  const actual = areArraysEqual([], []);

  expect(actual).toEqual(expected);
});

test("pass two equal arrays with numbers, expect to return true", () => {
  const expected = true;

  const actual = areArraysEqual([1, 2], [1, 2]);

  expect(actual).toEqual(expected);
});

test("pass two equal arrays with strings, expect to return true", () => {
  const expected = true;

  const actual = areArraysEqual(["aba", "babas"], ["aba", "babas"]);

  expect(actual).toEqual(expected);
});
