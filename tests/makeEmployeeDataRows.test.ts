import { TableData } from "../src/classes/TableData";
import { makeEmployeeDataRows } from "../src/tableBuildingFunctions/makeEmployeeDataRows";
import { getTableHeaders } from "../src/constants/constant";

test("make two dimensional array from parsed json, json file consist of predefined table values, expect table values", async () => {
  const expectedTable = [
    [651, "NO", "Confirmit", "Studio", "Kachalov Alexey", ""],
    [651, "NO", "Confirmit", "Studio", "Kolokolenkina Natalia", ""],
    [651, "NO", "Confirmit", "Studio", "Kozlova Anna", ""],
    [651, "NO", "Confirmit", "Studio", "Pisarenko Dmitry", ""],
    [651, "NO", "Confirmit", "Studio", "Popov Sergey", ""],
    [651, "NO", "Confirmit", "Studio", "Protasov Ilya", ""],
    [651, "NO", "Confirmit", "Studio", "Sumatokhin Alexey", ""],
    [651, "NO", "Confirmit", "Studio", "Volyakov Dmitry", ""],
    [651, "NO", "Confirmit", "Studio", "Volyakova Kristina", ""],
  ];
  const tabledata: TableData = {
    unit: 651,
    companyCode: "NO",
    companyName: "Confirmit",
    project: "Studio",
    employees: [
      {
        name: "Kachalov Alexey",
        jiraUsername: "alexeyk",
      },
      {
        name: "Kolokolenkina Natalia",
        jiraUsername: "NataliaK",
      },
      {
        name: "Kozlova Anna",
        jiraUsername: "AnnaKo",
      },
      {
        name: "Pisarenko Dmitry",
        jiraUsername: "DmitryP",
      },
      {
        name: "Popov Sergey",
        jiraUsername: "SergeyPo",
      },
      {
        name: "Protasov Ilya",
        jiraUsername: "Ilia.Protasov",
      },
      {
        name: "Sumatokhin Alexey",
        jiraUsername: "AlexeySu",
      },
      {
        name: "Volyakov Dmitry",
        jiraUsername: "DmitryV",
      },
      {
        name: "Volyakova Kristina",
        jiraUsername: "KristinaZ",
      },
    ],
  };

  const actualTable = await makeEmployeeDataRows({
    tableData: tabledata,
    headers: getTableHeaders().map((item) => item.label),
    getCredentials: () => Promise.resolve({ login: "", password: "" }),
    fetchUserTasks: () => Promise.resolve([]),
  });

  expect(actualTable).toEqual(expectedTable);
});

test("make table rows values, pass empty function parameter, expect empty table", async () => {
  const expectedTable = [];

  const actualTable = await makeEmployeeDataRows({
    tableData: {
      employees: [],
      companyCode: "",
      companyName: "",
      unit: 0,
      project: "",
    },
    headers: [],
    getCredentials: () => Promise.resolve({ login: "", password: "" }),
    fetchUserTasks: () => Promise.resolve([]),
  });

  expect(actualTable).toEqual(expectedTable);
});
