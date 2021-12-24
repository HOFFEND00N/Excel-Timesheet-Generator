import { ITeamConfig } from "../../models/ITeamConfig";
import { isEmployeeDataValid } from "./isEmployeeDataValid";

export function isTeamsConfigValid(teams?: ITeamConfig[]) {
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
      console.log("company code field is missing/incorrect in config");
      return false;
    }

    if (!team.unit) {
      console.log("unit field is missing/incorrect in config");
      return false;
    }

    if (!team.product) {
      console.log("product field is missing/incorrect in config");
      return false;
    }

    if (!team.project) {
      console.log("project field is missing/incorrect in config");
      return false;
    }

    if (!team.fileNameTemplate) {
      console.log("fileNameTemplate field is missing/incorrect in config");
      return false;
    }
  }

  return true;
}
