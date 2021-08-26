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
