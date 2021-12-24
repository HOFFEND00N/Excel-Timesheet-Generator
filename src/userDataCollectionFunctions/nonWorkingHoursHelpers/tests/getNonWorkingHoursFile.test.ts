import { getNonWorkingHoursFile } from "../getNonWorkingHoursFile";
import { readNonWorkingHoursFile } from "../readNonWorkingHoursFile";
import { getPathToNonWorkingHoursFileFromCLI } from "../getPathToNonWorkingHoursFileFromCLI";

jest.mock("../readNonWorkingHoursFile");
jest.mock("../getPathToNonWorkingHoursFileFromCLI");

test("should get file, when path in config", async () => {
  (readNonWorkingHoursFile as jest.Mock).mockReturnValue([["test"]]);
  const expectedFile = [["test"]];

  const actualFile = await getNonWorkingHoursFile("");

  expect(actualFile).toEqual(expectedFile);
});

test("should get file, when path in config incorrect, then get correct path from CLI", async () => {
  (readNonWorkingHoursFile as jest.Mock).mockImplementation((path: string) => {
    if (path !== "bad path") {
      return [["test"]];
    } else {
      throw "error";
    }
  });
  (getPathToNonWorkingHoursFileFromCLI as jest.Mock).mockReturnValue("test");
  const expectedFile = [["test"]];

  const actualFile = await getNonWorkingHoursFile("bad path");

  expect(actualFile).toEqual(expectedFile);
});

test("should get file, when path in config not provided, then get correct path from CLI", async () => {
  (readNonWorkingHoursFile as jest.Mock).mockReturnValue([["test"]]);
  (getPathToNonWorkingHoursFileFromCLI as jest.Mock).mockReturnValue("");
  const expectedFile = [["test"]];

  const actualFile = await getNonWorkingHoursFile();

  expect(actualFile).toEqual(expectedFile);
});
