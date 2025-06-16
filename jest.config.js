module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",

  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|bmp|tiff)$': '<rootDir>/__mocks__/fileMock.js',
  },

  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.css$": "jest-transform-css",
  },

  transformIgnorePatterns: [
    "/node_modules/(?!axios/)"
  ],

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]
};
