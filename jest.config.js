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
    "!./src/app.ts",
    "!./src/XMLGeneratingFunctions/**",
    "!./src/classes/**",
    "!./src/tableBuildingFunctions/fetchJiraUserTasks.ts",
    "!./src/tableBuildingFunctions/getCredentials.ts",
    "!./src/tableBuildingFunctions/getNonWorkingHoursFile.ts",
    "!./src/tableBuildingFunctions/getWorkingHoursForMonth.ts",
    "!./src/tableBuildingFunctions/types.ts",
  ],
};
export default config;
