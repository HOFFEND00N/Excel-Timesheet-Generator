import { getEmployeesTasks } from "../src/tableBuildingFunctions/getEmployeesTasks";

test("fetch tasks from zero employees, expect zero task", async () => {
  const expectedTasks: string[] = [];

  const actualTasks = await getEmployeesTasks({
    fetchUserTasks: () => Promise.resolve([]),
    jiraUserNames: [],
    getCredentials: () => Promise.resolve({ login: "", password: "" }),
  });

  expect(actualTasks).toEqual(expectedTasks);
});

test("fetch tasks from one employee, expect two tasks", async () => {
  const expectedTasks: string[][] = [["task 1", "task 2"]];

  const actualTasks = await getEmployeesTasks({
    fetchUserTasks: () => Promise.resolve(["task 1", "task 2"]),
    jiraUserNames: ["first"],
    getCredentials: () => Promise.resolve({ login: "", password: "" }),
  });

  expect(actualTasks).toEqual(expectedTasks);
});

test("fetch tasks from two employees, expect three tasks", async () => {
  const expectedTasks: string[][] = [["task 1", "task 2"], ["task 1"]];

  const actualTasks = await getEmployeesTasks({
    fetchUserTasks: (user) => {
      const tmp = { first: ["task 1", "task 2"], second: ["task 1"] };
      return tmp[user.jiraUserName];
    },
    jiraUserNames: ["first", "second"],
    getCredentials: () => Promise.resolve({ login: "", password: "" }),
  });

  expect(actualTasks).toEqual(expectedTasks);
});
