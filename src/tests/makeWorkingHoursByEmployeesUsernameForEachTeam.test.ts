import { HoursByEmployees } from "../tableBuildingFunctions/types";
import { makeWorkingHoursByEmployeesUsernameForEachTeam } from "../makeWorkingHoursByEmployeesUsernameForEachTeam";

test("should return working hours for 2 teams", () => {
  const expectedWorkingHoursByEmployeesUsername: HoursByEmployees[] = [
    {
      "employee 1": 160,
      "employee 2": 120,
    },
    {
      "employee 3": 120,
      "employee 4": 160,
    },
  ];

  const actualWorkingHoursByEmployeesUsername = makeWorkingHoursByEmployeesUsernameForEachTeam({
    workingHoursPerMonth: 160,
    teams: [
      {
        companyCode: "",
        product: "",
        project: "",
        unit: 1,
        teamLead: {
          jiraUsername: "employee 1",
          lastName: "employee",
          firstName: "1",
        },
        employees: [
          {
            jiraUsername: "employee 2",
            lastName: "employee",
            firstName: "2",
            workingHoursPerMonth: 120,
          },
        ],
      },
      {
        companyCode: "",
        product: "",
        project: "",
        unit: 1,
        teamLead: {
          jiraUsername: "employee 3",
          lastName: "employee",
          firstName: "3",
          workingHoursPerMonth: 120,
        },
        employees: [
          {
            jiraUsername: "employee 4",
            lastName: "employee",
            firstName: "4",
          },
        ],
      },
    ],
    fileNameTemplate: "",
    jiraTaskQuery: "",
  });

  expect(actualWorkingHoursByEmployeesUsername).toEqual(expectedWorkingHoursByEmployeesUsername);
});
