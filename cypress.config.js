const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  env: {
    username: 'test@test.com',
    password: 'Test$1234'
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json'
  },
  e2e: {
    setupNodeEvents(on, config) {
      const username = process.env.USER_NAME
      const password = process.env.PASSWORD
      if (!password) {
        throw new Error('missing password environment variable')
      }
      config.env = {username, password }
      return config
    },
    baseUrl: "http://127.0.0.1:4200/",
    specPattern: "cypress/e2e/tests/**/**/*Test.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
