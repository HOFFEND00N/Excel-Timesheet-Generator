import { ITeamConfig } from "../../models/ITeamConfig";
import { isEmployeeDataValid } from "./isEmployeeDataValid";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTeamsConfigValid(teams?: any): teams is ITeamConfig[] {
  if (!teams) {
    console.log("teams field is missing in config");
    return false;
  }

  if (teams.length === 0) {
    console.log("There is no teams in config");
    return false;
  }

  for (const team of teams) {
    if (!isEmployeeDataValid(team.teamLead)) {
      return false;
    }

    if (!team.employees) {
      console.log("There is no employees field inside team in config");
      return false;
    }

    if (team.employees.length === 0) {
      console.log("There is no employees inside team in config");
      return false;
    }

    for (const employee of team.employees) {
      if (!isEmployeeDataValid(employee)) {
        return false;
      }
    }

    if (!team.companyCode) {
      console.log("company code field is missing in config");
      return false;
    }

    if (!team.unit) {
      console.log("unit field is missing in config");
      return false;
    }

    if (!team.product) {
      console.log("product field is missing in config");
      return false;
    }

    if (!team.project) {
      console.log("project field is missing in config");
      return false;
    }
  }

  return true;
}
