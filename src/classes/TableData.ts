import { Employee } from "./Employee";

export interface TableData {
  unit: number;
  companyCode: string;
  companyName: string;
  project: string;
  employees: Employee[];
  teamLead: Employee;
}
