import { makeUserTasksByEmployeeUsername } from "../src/tableBuildingFunctions/makeUserTasksByEmployeeUsername";

test("pass zero user tasks, expect to return empty record", () => {
  const expectedUserTasksByEmployee: Record<string, string> = {};

  const actualUserTasksByEmployee = makeUserTasksByEmployeeUsername([]);

  expect(actualUserTasksByEmployee).toEqual(expectedUserTasksByEmployee);
});

test("pass one user task, expect to return record with one task", () => {
  const expectedUserTasksByEmployee: Record<string, string[]> = {
    KarasevaS: ["task 1"],
  };

  const actualUserTasksByEmployee = makeUserTasksByEmployeeUsername([
    { tasks: [{ taskKey: "task 1", epicKey: " " }], userName: "KarasevaS" },
  ]);

  expect(actualUserTasksByEmployee).toEqual(expectedUserTasksByEmployee);
});

test("pass two user tasks, expect to return record with two task", () => {
  const expectedUserTasksByEmployee: Record<string, string[]> = {
    KarasevaS: ["task 1 task 2"],
  };

  const actualUserTasksByEmployee = makeUserTasksByEmployeeUsername([
    {
      tasks: [{ taskKey: "task 1 task 2", epicKey: " " }],
      userName: "KarasevaS",
    },
  ]);

  expect(actualUserTasksByEmployee).toEqual(expectedUserTasksByEmployee);
});

test("pass two user tasks for two users, expect to return two records with two task", () => {
  const expectedUserTasksByEmployee: Record<string, string[]> = {
    KarasevaS: ["task 1 task 2"],
    MatrosovaM: ["task 3 task 4"],
  };

  const actualUserTasksByEmployee = makeUserTasksByEmployeeUsername([
    {
      tasks: [{ taskKey: "task 1 task 2", epicKey: " " }],
      userName: "KarasevaS",
    },
    {
      tasks: [{ taskKey: "task 3 task 4", epicKey: "epic task 1" }],
      userName: "MatrosovaM",
    },
  ]);

  expect(actualUserTasksByEmployee).toEqual(expectedUserTasksByEmployee);
});
