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
    "!./src/addTableCellsToWorkbook.ts",
    "!./src/XMLBuildingFunctions/**",
    "!./src/models/**",
    "!./src/tableBuildingFunctions/types.ts",
    "!./src/XlsxFileBuildingFunctions/**",
    "!./src/tableBuildingFunctions/index.ts",
    "!./src/tableBuildingFunctions/jiraHelpers/fetchJiraUserTasks.ts",
    "!./src/tableBuildingFunctions/jiraHelpers/getUserTasks.ts",
    "!./src/userDataCollectionFunctions/nonWorkingHoursHelpers/readNonWorkingHoursFile.ts",
    "!./src/userDataCollectionFunctions/nonWorkingHoursHelpers/getPathToNonWorkingHoursFileFromCLI.ts",
    "!./src/userDataCollectionFunctions/getUserData.ts",
    "!./src/userDataCollectionFunctions/credentialsHelpers/areJiraCredentialsCorrect.ts",
    "!./src/userDataCollectionFunctions/credentialsHelpers/getCredentialsFromCLI.ts",
    "!./src/userDataCollectionFunctions/credentialsHelpers/getCredentialsFromEnvironment.ts",
    "!./src/userDataCollectionFunctions/workingHoursHelpers/getWorkingHoursPerMonth.ts",
  ],
};
export default config;
