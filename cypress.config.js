const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://blankfactor.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
