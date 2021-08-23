import fs from "fs";
import fsPromisified from "fs/promises";
import path from "path";
import { searchFilesAndDirectories } from "../searchFilesAndDirectories";
import { getDiskInfo } from "node-disk-info";

jest.mock("node-disk-info");
jest.mock("fs");
jest.mock("fs/promises");

test("input is empty, expect to return drives list", async () => {
  const expectedFilesAndDirectories = [`C:${path.sep}`];

  (getDiskInfo as jest.Mock).mockReturnValue([{ mounted: "C:" }]);
  const actualFilesAndDirectories = await searchFilesAndDirectories({}, "");

  expect(actualFilesAndDirectories).toEqual(expectedFilesAndDirectories);
});

test("input contains wrong path, expect to return nothing", async () => {
  const expectedFilesAndDirectories = [];

  fsPromisified.readdir = jest.fn().mockReturnValue(new Error("ENOENT"));
  const actualFilesAndDirectories = await searchFilesAndDirectories({}, "c");

  expect(actualFilesAndDirectories).toEqual(expectedFilesAndDirectories);
});

test("input contains path to a folder, expect to return 2 files", async () => {
  const expectedFilesAndDirectories = [
    `C:${path.sep}fileA`,
    `C:${path.sep}fileB`,
  ];

  fsPromisified.readdir = jest.fn().mockReturnValue([`fileA`, `fileB`]);
  fs.existsSync = jest.fn().mockReturnValue(true);
  fs.statSync = jest.fn().mockReturnValue({ isDirectory: () => false });
  const actualFilesAndDirectories = await searchFilesAndDirectories(
    {},
    `C:${path.sep}f`
  );

  expect(actualFilesAndDirectories).toEqual(expectedFilesAndDirectories);
});

test("input contains complex path , expect to return file and folder", async () => {
  const expectedFilesAndDirectories = [
    `C:${path.sep}folderA${path.sep}folderB${path.sep}`,
    `C:${path.sep}folderA${path.sep}fileB`,
  ];

  fsPromisified.readdir = jest
    .fn()
    .mockReturnValue([`folderB`, `fileB`, ".git"]);
  fs.existsSync = jest.fn().mockReturnValue(true);
  fs.statSync = jest.fn().mockImplementation((searchPath: string) => {
    return {
      isDirectory: jest.fn().mockImplementation(() => {
        const lastPathSeparator = searchPath.lastIndexOf(path.sep) + 1;
        return searchPath.substring(lastPathSeparator).includes("folder");
      }),
    };
  });
  const actualFilesAndDirectories = await searchFilesAndDirectories(
    {},
    `C:${path.sep}folderA${path.sep}f`
  );

  expect(actualFilesAndDirectories).toEqual(expectedFilesAndDirectories);
});
