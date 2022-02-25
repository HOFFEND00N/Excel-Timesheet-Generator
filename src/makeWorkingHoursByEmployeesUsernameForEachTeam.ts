import { getWorkingHoursByEmployeesUsername } from "./userDataCollectionFunctions";
import { HoursByEmployees } from "./tableBuildingFunctions/types";
import { IConfig } from "./models/IConfig";

export function makeWorkingHoursByEmployeesUsernameForEachTeam(config: IConfig) {
  const workingHoursByEmployeesUsernameForEachTeam: HoursByEmployees[] = [];

  for (const team of config.teams) {
    const workingHoursByEmployeesUsername = getWorkingHoursByEmployeesUsername({
      workingHoursPerMonth: config.workingHoursPerMonth,
      team: [...team.employees, team.teamLead],
    });
    workingHoursByEmployeesUsernameForEachTeam.push(workingHoursByEmployeesUsername);
  }
  return workingHoursByEmployeesUsernameForEachTeam;
}
