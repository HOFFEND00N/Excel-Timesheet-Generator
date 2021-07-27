import { isNumeric } from "../src/utils/isNumeric";

test("pass string expect false", () => {
  expect(isNumeric("a")).toBe(false);
});

test("pass number expect true", () => {
  expect(isNumeric(2)).toBe(true);
});

test("pass number as string expect true", () => {
  expect(isNumeric("2")).toBe(true);
});

test("pass null expect false", () => {
  expect(isNumeric(null)).toBe(false);
});

test("pass undefined expect false", () => {
  expect(isNumeric(undefined)).toBe(false);
});

test("pass NaN expect false", () => {
  expect(isNumeric(NaN)).toBe(false);
});
