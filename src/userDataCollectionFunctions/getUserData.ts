import { LINE_BREAK } from "../constants/constant";
import { IConfig } from "../models/IConfig";
import fs from "fs";
import { getCredentials } from "./credentialsHelpers/getCredentials";
import { getNonWorkingHoursFile } from "./nonWorkingHoursHelpers/getNonWorkingHoursFile";
import { isConfigValid } from "./configValidation/isConfigValid";

export async function getUserData() {
  console.log(LINE_BREAK);
  console.log("TIMESHEET GENERATOR");
  console.log(LINE_BREAK);

  const config: IConfig = JSON.parse(fs.readFileSync("config.json", "utf-8"));
  if (!isConfigValid(config)) {
    process.exit(1);
  }

  const { login, password } = await getCredentials(config.credentials);
  console.log("Credentials have been got successfully");
  console.log(LINE_BREAK);

  const nonWorkingHoursFile = await getNonWorkingHoursFile(config.pathToNonWorkingHoursFile);
  console.log(LINE_BREAK);

  return { config, login, password, nonWorkingHoursFile };
}
