module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  automock: false,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/interfaces/**/*.ts",
    "!src/utils/index.ts",
    "!src/index.ts",
    "!src/api/index.ts",
    "!src/utils/mongo/index.ts"
  ],
  transform: {
    "^.+\\.(ts|js)x?$": [
      'ts-jest', 
      {
        tsconfig: "tsconfig.json",
        isolatedModules: true,
      },
    ]
  },
  testPathIgnorePatterns: ["./dist/"],
  cacheDirectory: ".jest-cache",
};
