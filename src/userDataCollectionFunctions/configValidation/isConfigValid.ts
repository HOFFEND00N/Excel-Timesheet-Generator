import { IConfig } from "../../models/IConfig";
import { isTeamsConfigValid } from "./isTeamsConfigValid";

export function isConfigValid(config: IConfig) {
  if (!config.jiraTaskQuery) {
    console.log("jiraTaskQuery field is missing in config");
    return false;
  }

  return isTeamsConfigValid(config.teams);
}
