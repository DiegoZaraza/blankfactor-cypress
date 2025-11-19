// Utility functions for common test operations

export class TestUtils {
  
  // Generate random test data
  static generateRandomUser() {
    const timestamp = Date.now();
    return {
      firstName: `Test${timestamp}`,
      lastName: `User${timestamp}`,
      company: `Company${timestamp}`,
      email: `test${timestamp}@example.com`,
      phone: `555-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      challenge: `Automated test challenge ${timestamp}`
    };
  }
  
  // Wait for network requests to complete
  static waitForNetworkIdle(timeout = 5000) {
    let requestCount = 0;
    
    cy.intercept('**', (req) => {
      requestCount++;
      req.continue((res) => {
        requestCount--;
      });
    });
    
    cy.waitUntil(() => requestCount === 0, {
      timeout,
      interval: 100,
      errorMsg: 'Network requests did not complete within timeout'
    });
  }
  
  // Screenshot with custom naming
  static takeScreenshot(name, options = {}) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    cy.screenshot(`${name}-${timestamp}`, options);
  }
  
  // Retry action with exponential backoff
  static retryAction(action, maxRetries = 3, delay = 1000) {
    let attempts = 0;
    
    function attempt() {
      attempts++;
      return action().catch((error) => {
        if (attempts < maxRetries) {
          cy.wait(delay * attempts); // Exponential backoff
          return attempt();
        }
        throw error;
      });
    }
    
    return attempt();
  }
  
  // Check element exists with timeout
  static elementExists(selector, timeout = 10000) {
    return cy.get('body').then($body => {
      return $body.find(selector).length > 0;
    });
  }
  
  // Get environment specific data
  static getEnvironmentConfig() {
    const env = Cypress.env('environment') || 'production';
    const configs = {
      production: {
        baseUrl: 'https://blankfactor.com',
        apiUrl: 'https://api.blankfactor.com'
      },
      staging: {
        baseUrl: 'https://staging.blankfactor.com',
        apiUrl: 'https://api-staging.blankfactor.com'
      },
      development: {
        baseUrl: 'https://dev.blankfactor.com',
        apiUrl: 'https://api-dev.blankfactor.com'
      }
    };
    
    return configs[env] || configs.production;
  }
}