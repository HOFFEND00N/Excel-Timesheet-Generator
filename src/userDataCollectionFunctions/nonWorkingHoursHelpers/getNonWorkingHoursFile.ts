import { getPathToNonWorkingHoursFileFromCLI } from "./getPathToNonWorkingHoursFileFromCLI";
import { readNonWorkingHoursFile } from "./readNonWorkingHoursFile";
import { errorHandler } from "../../utils/errorHandler";

export async function getNonWorkingHoursFile(path?: string): Promise<string[][]> {
  if (path) {
    try {
      return readNonWorkingHoursFile(path);
    } catch (e) {
      console.log("Path from config is incorrect");
    }
  } else {
    console.log("Did not find path to file with non-working hours in config");
  }

  return await errorHandler(async () => {
    path = await getPathToNonWorkingHoursFileFromCLI();
    return readNonWorkingHoursFile(path);
  });
}
