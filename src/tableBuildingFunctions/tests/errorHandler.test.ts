import { errorHandler } from "../errorHandler";

test("pass function with , expect to return 1", async () => {
  const expected = 1;

  const actual = await errorHandler(async () => {
    return 1;
  });

  expect(actual).toEqual(expected);
});

test("pass function with one caught error, expect to return 1 on second iteration", async () => {
  const expected = true;
  let exceptionThrown = false;

  const actual = await errorHandler(async () => {
    if (!exceptionThrown) {
      exceptionThrown = true;
      throw new Error("Error!");
    } else return exceptionThrown;
  });

  expect(actual).toEqual(expected);
});
