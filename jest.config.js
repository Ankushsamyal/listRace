module.exports = {
  // Automatically clear mock calls, instances, and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  testEnvironment: 'jsdom', 

  // Mock CSS files
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy', // Mock CSS imports
    '\\.(jpg|jpeg|png|gif|bmp|tiff)$': '<rootDir>/__mocks__/fileMock.js', // Mock image imports
  },

  // Custom transform configuration
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Handle JS/JSX files
    "^.+\\.css$": "jest-transform-css", // Handle CSS files
  },

  // Other Jest configurations can go here
};
