import { HoursByEmployees } from "../types";
import { getWorkingHoursByEmployeesUsername } from "../getWorkingHoursByEmployeesUsername";

test("pass the same working hours rate fro everybody, expect to return employees with equal working hours rate", async () => {
  const expectedWorkingHoursByEmployeesUsername: HoursByEmployees = {
    KarasevaS: 120,
    MatrosovaM: 120,
  };

  const actualWorkingHoursByEmployeesUsername = await getWorkingHoursByEmployeesUsername({
    employees: [
      { jiraUsername: "KarasevaS", name: "Karaseva Svetlana" },
      { jiraUsername: "MatrosovaM", name: "Matrosova Marianna" },
    ],
    getChosenEmployeesNames: jest.fn().mockReturnValue([]),
    getWorkingHoursPerMonth: jest.fn().mockReturnValue(120),
    shouldUpdateEmployeeMonthRate: jest.fn().mockReturnValue(false),
  });

  expect(actualWorkingHoursByEmployeesUsername).toEqual(expectedWorkingHoursByEmployeesUsername);
});

test("pass the same working hours rate fro everybody, expect to return employees with equal working hours rate", async () => {
  const expectedWorkingHoursByEmployeesUsername: HoursByEmployees = {
    KarasevaS: 120,
    MatrosovaM: 140,
  };

  let shouldUpdateEmployeeMonthRate = true;
  const actualWorkingHoursByEmployeesUsername = await getWorkingHoursByEmployeesUsername({
    employees: [
      { jiraUsername: "KarasevaS", name: "Karaseva Svetlana" },
      { jiraUsername: "MatrosovaM", name: "Matrosova Marianna" },
    ],
    getChosenEmployeesNames: jest.fn().mockReturnValue([{ jiraUsername: "KarasevaS", name: "Karaseva Svetlana" }]),
    getWorkingHoursPerMonth: jest.fn().mockImplementation(() => {
      if (shouldUpdateEmployeeMonthRate) {
        return 140;
      } else {
        return 120;
      }
    }),
    shouldUpdateEmployeeMonthRate: jest.fn().mockImplementation(() => {
      if (shouldUpdateEmployeeMonthRate) {
        shouldUpdateEmployeeMonthRate = false;
        return true;
      } else {
        return false;
      }
    }),
  });

  expect(actualWorkingHoursByEmployeesUsername).toEqual(expectedWorkingHoursByEmployeesUsername);
});
