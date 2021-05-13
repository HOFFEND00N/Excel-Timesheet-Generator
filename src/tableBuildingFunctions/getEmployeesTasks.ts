export async function getEmployeesTasks({
  fetchUserTasks,
  jiraUserNames,
  getCredentials,
}: {
  fetchUserTasks: ({
    jiraUserName,
    login,
    password,
  }: {
    jiraUserName: string;
    login: string;
    password: string;
  }) => Promise<string[]>;
  jiraUserNames: string[];
  getCredentials: () => Promise<{
    login: string;
    password: string;
  }>;
}) {
  const tasks: string[][] = [];
  const { login, password } = await getCredentials();

  for (const jiraUserName of jiraUserNames) {
    try {
      tasks.push(await fetchUserTasks({ jiraUserName, login, password }));
    } catch (res) {
      console.log(res);
    }
  }

  return tasks;
}
