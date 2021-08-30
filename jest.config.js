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
    "!./src/tableBuildingFunctions/jiraHelpers/**",
    "!./src/tableBuildingFunctions/employeeHoursHelpers/nonWorkingHoursHelpers/getNonWorkingHoursFile.ts",
    "!./src/tableBuildingFunctions/types.ts",
    "!./src/XlsxFileBuildingFunctions/**",
    "!./src/tableBuildingFunctions/index.ts",
  ],
};
export default config;
