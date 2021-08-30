import { IEmployee } from "./IEmployee";

export interface IConfig {
  unit: number;
  companyCode: string;
  companyName: string;
  project: string;
  employees: IEmployee[];
  teamLead: IEmployee;
}
