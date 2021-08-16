import fsPromisified from "fs/promises";
import fuzzy from "fuzzy";
import fs from "fs";

export async function findSuitableFilesAndDirectories(searchPath: string) {
  const alreadyDefinedPath = searchPath.slice(
    0,
    searchPath.lastIndexOf("/") + 1
  );
  const filesAndDirectories = (
    await fsPromisified.readdir(alreadyDefinedPath)
  ).map((element) => alreadyDefinedPath.concat(element));
  const suitableFilesAndFolders = fuzzy.filter(searchPath, filesAndDirectories);
  return suitableFilesAndFolders.map((fileOrFolder) => {
    const path = fileOrFolder.string;
    if (fs.existsSync(path) && fs.statSync(path).isDirectory())
      return path.concat("/");
    return path;
  });
}
