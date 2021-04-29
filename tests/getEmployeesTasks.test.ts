import { getEmployeesTasks } from "../src/tableBuildingFunctions/fetchJiraTasks";

test("fetch tasks from zero employees, expect zero task", async () => {
  const expectedTasks: string[] = [];

  const actualTasks = await getEmployeesTasks(() => {
    return [];
  }, []);

  expect(actualTasks).toEqual(expectedTasks);
});

test("fetch tasks from one employee, expect two tasks", async () => {
  const expectedTasks: string[][] = [["task 1", "task 2"]];

  const actualTasks = await getEmployeesTasks(() => {
    return ["task 1", "task 2"];
  }, ["first"]);

  expect(actualTasks).toEqual(expectedTasks);
});

test("fetch tasks from two employees, expect three tasks", async () => {
  const expectedTasks: string[][] = [["task 1", "task 2"], ["task 1"]];

  const actualTasks = await getEmployeesTasks(
    (jiraUserName) => {
      const tmp = { first: ["task 1", "task 2"], second: ["task 1"] };
      return tmp[jiraUserName];
    },
    ["first", "second"]
  );

  expect(actualTasks).toEqual(expectedTasks);
});
