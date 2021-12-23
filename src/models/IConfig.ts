import { ITeamConfig } from "./ITeamConfig";
import { ICredentials } from "./ICredentials";

export interface IConfig {
  pathToNonWorkingHoursFile: string;
  credentials: ICredentials;
  date?: { year: number; month: number };
  employeeJiraTaskQuery: string;
  workingHoursPerMonth: number;
  teams: ITeamConfig[];
}
