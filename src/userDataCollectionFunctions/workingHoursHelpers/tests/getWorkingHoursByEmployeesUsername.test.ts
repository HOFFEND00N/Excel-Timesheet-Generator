import { HoursByEmployees } from "../../../tableBuildingFunctions/types";
import { getWorkingHoursByEmployeesUsername } from "../getWorkingHoursByEmployeesUsername";

test("should return one employee with specific working hours and one with default", () => {
  const expectedWorkingHoursByEmployeesUsername: HoursByEmployees = {
    "employee 1": 160,
    "employee 2": 120,
  };

  const actualWorkingHoursByEmployeesUsername = getWorkingHoursByEmployeesUsername({
    workingHoursPerMonth: 160,
    team: [
      {
        jiraUsername: "employee 1",
        lastName: "employee",
        firstName: "1",
      },
      {
        jiraUsername: "employee 2",
        lastName: "employee",
        firstName: "2",
        workingHoursPerMonth: 120,
      },
    ],
  });

  expect(actualWorkingHoursByEmployeesUsername).toEqual(expectedWorkingHoursByEmployeesUsername);
});
