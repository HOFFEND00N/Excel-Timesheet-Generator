const config = {
  moduleFileExtensions: ["ts", "js"],
  transform: { "\\.ts$": "ts-jest" },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverageFrom: [
    "**/*.ts",
    "!**/node_modules/**",
    "!**/index.ts",
    "!./src/app.ts",
    "!./src/XMLBuildingFunctions/**",
    "!./src/models/**",
    "!./src/tableBuildingFunctions/types.ts",
    "!./src/XlsxFileBuildingFunctions/**",
    "!./src/tableBuildingFunctions/index.ts",
    "!./src/tableBuildingFunctions/jiraHelpers/fetchJiraUserTasks.ts",
    "!./src/tableBuildingFunctions/jiraHelpers/getUserTasks.ts",
    "!./src/userDataCollectionFunctions/nonWorkingHoursHelpers/getNonWorkingHoursFile.ts",
    "!./src/userDataCollectionFunctions/getUserData.ts",
    "!./src/userDataCollectionFunctions/areJiraCredentialsCorrect.ts",
    "!./src/userDataCollectionFunctions/credentialsHelpers/getCredentialsFromCLI.ts",
    "!./src/userDataCollectionFunctions/credentialsHelpers/getCredentialsFromEnvironment.ts",
    "!./src/userDataCollectionFunctions/workingHoursHelpers/chooseEmployees.ts",
    "!./src/userDataCollectionFunctions/workingHoursHelpers/getWorkingHoursPerMonth.ts",
    "!./src/userDataCollectionFunctions/workingHoursHelpers/shouldUpdateEmployeeMonthRate.ts",
  ],
};
export default config;
