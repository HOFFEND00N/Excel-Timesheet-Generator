import fs from "fs";
import fsPromisified from "fs/promises";
import { findSuitableFilesAndDirectories } from "../findSuitableFilesAndDirectories";

jest.mock("fs");
jest.mock("fs/promises");

test("pass 2 files, expect to return 2 files", async () => {
  fs.existsSync = jest.fn().mockReturnValue(true);
  fs.statSync = jest.fn().mockReturnValue({ isDirectory: () => false });
  fsPromisified.readdir = jest.fn().mockReturnValue(["fileA", "fileB"]);
  const expectedSuitableFiles = ["fileA", "fileB"];

  const actualSuitableFiles = await findSuitableFilesAndDirectories("f");

  expect(actualSuitableFiles).toEqual(expectedSuitableFiles);
});

test("pass file and folder, expect to return file and folder concatenated with /", async () => {
  fs.existsSync = jest.fn().mockReturnValue(true);
  fs.statSync = jest.fn().mockImplementation((path: string) => {
    return {
      isDirectory: jest.fn().mockImplementation(() => {
        return path.includes("folder");
      }),
    };
  });
  fsPromisified.readdir = jest.fn().mockReturnValue(["folderA", "fileB"]);
  const expectedSuitableFiles = ["folderA/", "fileB"];

  const actualSuitableFiles = await findSuitableFilesAndDirectories("f");

  expect(actualSuitableFiles).toEqual(expectedSuitableFiles);
});

test("pass file and folder, expect to return folder concatenated with /", async () => {
  fs.existsSync = jest.fn().mockReturnValue(true);
  fs.statSync = jest.fn().mockImplementation((path: string) => {
    return {
      isDirectory: jest.fn().mockImplementation(() => {
        return path.includes("folder");
      }),
    };
  });
  fsPromisified.readdir = jest.fn().mockReturnValue(["folderA", "fileB"]);
  const expectedSuitableFiles = ["folderA/"];

  const actualSuitableFiles = await findSuitableFilesAndDirectories("fol");

  expect(actualSuitableFiles).toEqual(expectedSuitableFiles);
});
