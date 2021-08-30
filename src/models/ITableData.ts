import { IEmployee } from "./IEmployee";

export interface ITableData {
  unit: number;
  companyCode: string;
  companyName: string;
  project: string;
  employees: IEmployee[];
  teamLead: IEmployee;
}
