/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  moduleNameMapper: {
      "@/(.*)": `<rootDir>/src/$1`,
  },
};