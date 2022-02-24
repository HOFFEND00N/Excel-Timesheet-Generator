import { IEmployee } from "./IEmployee";

export interface ITeamConfig {
  unit: number;
  companyCode: string;
  product: string;
  project: string;
  employees: IEmployee[];
  teamLead: IEmployee;
  workingHoursPerMonth?: number;
}
