import fsPromisified from "fs/promises";
import fuzzy, { FilterResult } from "fuzzy";
import fs from "fs";
import path from "path";

export async function findSuitableFilesAndDirectories(searchPath: string) {
  const parentDirectory = searchPath.substring(
    0,
    searchPath.lastIndexOf(path.sep) + 1
  );
  const filesAndDirectories = (
    await fsPromisified.readdir(parentDirectory)
  ).map((element: string) => parentDirectory.concat(element));
  const suitableFilesAndFolders = fuzzy.filter(searchPath, filesAndDirectories);
  return suitableFilesAndFolders.map((fileOrFolder: FilterResult<string>) => {
    const pathToFileOrFolder = fileOrFolder.string;
    if (
      fs.existsSync(pathToFileOrFolder) &&
      fs.statSync(pathToFileOrFolder).isDirectory()
    )
      return pathToFileOrFolder.concat(path.sep);
    return pathToFileOrFolder;
  });
}
