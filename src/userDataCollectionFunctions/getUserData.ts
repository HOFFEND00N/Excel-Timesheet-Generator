import { LINE_BREAK } from "../constants/constant";
import { IConfig } from "../models/IConfig";
import fs from "fs";
import { getCredentials } from "./credentialsHelpers/getCredentials";
import { getNonWorkingHoursFile } from "./nonWorkingHoursHelpers/getNonWorkingHoursFile";
import { isConfigValid } from "./configValidation/isConfigValid";
import { getWorkingHoursPerMonth } from "./workingHoursHelpers/getWorkingHoursPerMonth";

export async function getUserData() {
  console.log(LINE_BREAK);
  console.log("TIMESHEET GENERATOR");
  console.log(LINE_BREAK);

  const config: IConfig = JSON.parse(fs.readFileSync("config.json", "utf-8"));
  if (!isConfigValid(config)) {
    process.exit(1);
  }

  if (!config.workingHoursPerMonth) {
    console.log("workingHoursPerMonth field missing in config");
    config.workingHoursPerMonth = await getWorkingHoursPerMonth();
  }
  console.log(LINE_BREAK);

  const { login, password } = await getCredentials(config.credentials);
  console.log("Credentials have been got successfully");
  console.log(LINE_BREAK);

  const nonWorkingHoursFile = await getNonWorkingHoursFile(config.pathToNonWorkingHoursFile);
  console.log("File with non-working hours have been read successfully");
  console.log(LINE_BREAK);

  return { config, login, password, nonWorkingHoursFile };
}
