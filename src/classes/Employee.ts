import { EmployeePosition } from "../tableBuildingFunctions/types";

export interface Employee {
  name: string;
  jiraUsername: string;
  position: EmployeePosition;
}
