import fs from "fs";
import fsPromisified from "fs/promises";
import { findSuitableFilesAndDirectories } from "../findSuitableFilesAndDirectories";
import path from "path";

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
  const expectedSuitableFiles = ["folderA".concat(path.sep), "fileB"];

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
  const expectedSuitableFiles = ["folderA".concat(path.sep)];

  const actualSuitableFiles = await findSuitableFilesAndDirectories("fol");

  expect(actualSuitableFiles).toEqual(expectedSuitableFiles);
});

test("pass files and folder, expect to return files and folders concatenated with /", async () => {
  const basePath = path.join("folderA", "folderB");
  fs.existsSync = jest.fn().mockReturnValue(true);
  fs.statSync = jest.fn().mockImplementation((searchPath: string) => {
    return {
      isDirectory: jest.fn().mockImplementation(() => {
        return searchPath
          .slice(searchPath.lastIndexOf(path.sep))
          .includes("folder");
      }),
    };
  });
  fsPromisified.readdir = jest
    .fn()
    .mockReturnValue(["fileA", "fileB", "folderC", ".git"]);
  const expectedSuitableFiles = [
    path.join(basePath, "fileA"),
    path.join(basePath, "fileB"),
    path.join(basePath, "folderC").concat(path.sep),
  ];

  const actualSuitableFiles = await findSuitableFilesAndDirectories(
    path.join(basePath, "f")
  );

  expect(actualSuitableFiles).toEqual(expectedSuitableFiles);
});
