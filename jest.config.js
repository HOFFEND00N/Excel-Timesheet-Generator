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
    "!./src/XMLBuildingFunctions/**",
    "!./src/classes/**",
    "!./src/tableBuildingFunctions/jiraHelpers/**",
    "!./src/tableBuildingFunctions/employeeHoursHelpers/nonWorkingHoursHelpers/getNonWorkingHoursFile.ts",
    "!./src/tableBuildingFunctions/employeeHoursHelpers/workingHoursHelpers/getWorkingHoursPerMonth.ts",
    "!./src/tableBuildingFunctions/employeeHoursHelpers/workingHoursHelpers/shouldUpdateEmployeeMonthRate.ts",
    ...[
      "getNonWorkingHoursFile",
      "getWorkingHoursPerMonth",
      "types",
      "shouldUpdateEmployeeMonthRate",
      "chooseEmployees",
    ].map((file) => `!./src/tableBuildingFunctions/${file}.ts`),
    "!./src/XlsxFileBuildingFunctions/**",
    "!./src/tableBuildingFunctions/index.ts",
  ],
};
export default config;
