import { errorHandler } from "../errorHandler";

test("pass function with , expect to return 1", async () => {
  const callback = jest.fn().mockImplementation(async () => {
    return 1;
  });

  const actual = await errorHandler(callback);

  expect(callback).toBeCalledTimes(1);
  expect(actual).toEqual(1);
});

test("pass function with one caught error, expect to return 1 on second iteration", async () => {
  let exceptionThrown = false;
  const callback = jest.fn().mockImplementation(async () => {
    if (!exceptionThrown) {
      exceptionThrown = true;
      throw new Error("Error!");
    }
    return 1;
  });

  const actual = await errorHandler(callback);

  expect(callback).toBeCalledTimes(2);
  expect(actual).toEqual(1);
});
