import { ITeamConfig } from "./ITeamConfig";
import { ICredentials } from "./ICredentials";

export interface IConfig {
  pathToNonWorkingHoursFile?: string;
  credentials?: ICredentials;
  date?: { year: number; month: number };
  jiraTaskQuery: string;
  workingHoursPerMonth: number;
  teams: ITeamConfig[];
}
