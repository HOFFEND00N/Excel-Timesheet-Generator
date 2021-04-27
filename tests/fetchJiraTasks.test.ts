import { getTasks } from "../src/tableBuildingFunctions/fetchJiraTasks";

test('fetch tasks from one person, expect one task in following format [["task"],]', () => {
  const expectedTasks: string[][] = [["task-1"]];

  const actualTasks = async () => await getTasks(server);

  expect(actualTasks).toEqual(expectedTasks);
});
