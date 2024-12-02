module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/**/*.test.(ts|tsx)'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^primereact/(.*)$': '<rootDir>/tests/mocks/primereact-mock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!primereact|some-other-package).+\\.js$',
  ],
};