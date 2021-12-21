import { ITeamConfig } from "./ITeamConfig";

export interface IConfig {
  date?: { year: number; month: number };
  employeeJiraTaskQuery: string;
  workingHoursPerMonth: number;
  teams: ITeamConfig[];
}
