import { TableData } from "../src/classes/TableData";
import { fetchUserTasksArguments } from "../src/tableBuildingFunctions/makeTable";

export function getTableDataForTests(): TableData {
  return {
    unit: 651,
    companyCode: "NO",
    companyName: "Confirmit",
    project: "Studio",
    employees: [
      {
        name: "Molotkova Maria",
        jiraUsername: "MolotkovaM",
      },
      {
        name: "Matrosova Marianna",
        jiraUsername: "MatrosovaM",
      },
    ],
  };
}

export function getFetchUserTasksForTests(): ({
  jiraUserName,
  login,
  password,
}: fetchUserTasksArguments) => Promise<string[]> {
  return (user) => {
    const users = {
      MolotkovaM: ["task 1", "task 3"],
      MatrosovaM: ["task 2"],
    };
    return users[user.jiraUserName];
  };
}
