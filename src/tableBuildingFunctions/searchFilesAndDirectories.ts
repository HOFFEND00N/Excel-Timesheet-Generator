import { findSuitableFilesAndDirectories } from "./findSuitableFilesAndDirectories";
import { listDrives } from "./listDrives";

export async function searchFilesAndDirectories(
  previousAnswers: unknown,
  input = ""
) {
  let files: string[];
  try {
    if (input == "") {
      files = await listDrives();
    } else {
      files = await findSuitableFilesAndDirectories(input);
    }
  } catch (error) {
    files = [];
  }
  return files;
}
