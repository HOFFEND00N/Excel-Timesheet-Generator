import fsPromisified from "fs/promises";
import fuzzy, { FilterResult } from "fuzzy";
import fs from "fs";
import path from "path";

export async function findSuitableFilesAndDirectories(searchPath: string) {
  const lastPathSeparator = searchPath.lastIndexOf(path.sep) + 1;
  const parentDirectory = searchPath.substring(0, lastPathSeparator);

  const filesAndDirectories = (await fsPromisified.readdir(parentDirectory)).map(
    (element: string) => `${parentDirectory}${element}`
  );
  const suitableFilesAndFolders = fuzzy.filter(searchPath, filesAndDirectories);
  return suitableFilesAndFolders.map((fileOrFolder: FilterResult<string>) => {
    const pathToFileOrFolder = fileOrFolder.string;
    if (fs.existsSync(pathToFileOrFolder) && fs.statSync(pathToFileOrFolder).isDirectory())
      return `${pathToFileOrFolder}${path.sep}`;
    return pathToFileOrFolder;
  });
}
