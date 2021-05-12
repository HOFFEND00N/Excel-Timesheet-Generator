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
  getCredentials: () => {
    login: string;
    password: string;
  };
}) {
  const tasks: string[][] = [];
  //tests fails here, i ask for credentials while mocking fetchUserTasks()
  const { login, password } = getCredentials();

  for (const jiraUserName of jiraUserNames) {
    try {
      tasks.push(await fetchUserTasks({ jiraUserName, login, password }));
    } catch (res) {
      console.log(res);
    }
  }

  return tasks;
}
