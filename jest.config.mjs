/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  clearMocks: true,
};

export default config;