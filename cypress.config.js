const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://blankfactor.com',
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    video: true,
    screenshotOnRunFailure: true,
    watchForFileChanges: false,
    
    // Test execution settings
    retries: {
      runMode: 2,
      openMode: 0
    },
    
    // Improved error handling
    failOnStatusCode: false,
    chromeWebSecurity: false,
    
    // Environment variables
    env: {
      hideXHRInCommandLog: true,
      requestMode: true,
      responseMode: true
    },

    setupNodeEvents(on, config) {
      // Plugin for better reporting
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        table(message) {
          console.table(message);
          return null;
        }
      });
      
      // Screenshot customization
      on('after:screenshot', (details) => {
        console.log('Screenshot taken:', details);
      });

      return config;
    },
    
    // Spec pattern for better organization
    specPattern: [
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
      'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}'
    ],
    
    // Exclude example tests in CI
    excludeSpecPattern: [
      '**/1-getting-started/**',
      '**/2-advanced-examples/**'
    ]
  },
});
