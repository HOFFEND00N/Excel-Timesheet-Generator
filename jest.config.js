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
    ...[
      "fetchJiraUserTasks",
      "getCredentials",
      "getNonWorkingHoursFile",
      "getWorkingHoursForMonth",
      "types",
    ].map((file) => `!./src/tableBuildingFunctions/${file}.ts`),
  ],
};
export default config;
