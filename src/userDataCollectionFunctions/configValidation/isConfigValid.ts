import { IConfig } from "../../models/IConfig";
import { isTeamsConfigValid } from "./isTeamsConfigValid";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isConfigValid(config: any): config is IConfig {
  if (config.workingHoursPerMonth && typeof config.workingHoursPerMonth !== "number") {
    console.log("wrong type of workingHoursPerMonth field, must be a number");
    return false;
  }

  if (!config.jiraTaskQuery) {
    console.log("jiraTaskQuery field is missing in config");
    return false;
  }

  return isTeamsConfigValid(config.teams);
}
