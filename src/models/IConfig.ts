import { IEmployee } from "./IEmployee";

export interface IConfig {
  unit: number;
  companyCode: string;
  product: string;
  project: string;
  employees: IEmployee[];
  teamLead: IEmployee;
  date?: { year: number; month: number };
  reportFileName: string;
  employeeJiraTaskQuery: string;
}
