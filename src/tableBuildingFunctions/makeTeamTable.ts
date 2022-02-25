import { getUserTasks } from "./jiraHelpers";
import { fetchJiraUserTasks } from "./jiraHelpers/fetchJiraUserTasks";
import { getNonWorkingHoursRows } from "./nonWorkingHoursHelpers";
import { makeTable } from "./makeTable";
import { START_TABLE_POINT } from "../constants/constant";
import { CommonCell, HoursByEmployees } from "./types";
import { IConfig } from "../models/IConfig";

export async function makeTeamTable({
  config,
  login,
  password,
  nonWorkingHoursFile,
  workingHoursByEmployeesUsernameForEachTeam,
}: {
  config: IConfig;
  login: string;
  password: string;
  nonWorkingHoursFile: string[][];
  workingHoursByEmployeesUsernameForEachTeam: HoursByEmployees[];
}) {
  let startRow = START_TABLE_POINT.row + 1;
  let table: CommonCell[] = [];
  for (let i = 0; i < config.teams.length; i++) {
    const team = config.teams[i];
    const userTasksByEmployeeUsername = await getUserTasks({
      employeeJiraTaskQuery: config.jiraTaskQuery,
      login: login,
      password: password,
      fetchUserTasks: fetchJiraUserTasks,
      team,
    });

    const nonWorkingHoursRows = await getNonWorkingHoursRows(team, nonWorkingHoursFile);

    table = [
      ...table,
      ...(await makeTable({
        config: team,
        userTasksByEmployeeUsername,
        workingHoursByEmployeesUsername: workingHoursByEmployeesUsernameForEachTeam[i],
        nonWorkingHoursRows,
        startRow,
      })),
    ];

    startRow += nonWorkingHoursRows.length + team.employees.length + 2;
  }
  return table;
}
