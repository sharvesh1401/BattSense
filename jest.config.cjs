module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.ts', // Keep for other potential global setup
    '@testing-library/jest-dom' // Try this path
  ],
  moduleNameMapper: {
    // Handle CSS imports (if any in components)
    '\\.css$': 'identity-obj-proxy',
    // Handle path aliases, e.g., @components/*
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1', // Added for utils alias
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.app.json' }],
  },
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',
};
