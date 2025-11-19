# 🚀 Blankfactor Cypress Test Suite

[![Cypress Tests](https://img.shields.io/badge/cypress-tests-green.svg)](https://cypress.io)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16-brightgreen)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Comprehensive E2E testing suite for Blankfactor website using Cypress framework with Page Object Model architecture.

## 📋 Table of Contents

- [Features](#-features)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Running Tests](#-running-tests)
- [Test Architecture](#-test-architecture)
- [Configuration](#-configuration)
- [Contributing](#-contributing)

## ✨ Features

- **Page Object Model (POM)** architecture for maintainable tests
- **Custom Commands** for reusable functionality  
- **Data-driven testing** with fixtures and utilities
- **Cross-browser testing** support (Chrome, Firefox, Edge)
- **CI/CD ready** with parallel execution support
- **Comprehensive reporting** with screenshots and videos
- **Accessibility testing** capabilities
- **Network request interception** and mocking

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/DiegoZaraza/blankfactor-cypress.git
cd blankfactor-cypress

# Install dependencies
npm install

# Verify Cypress installation
npm run cy:verify
```

## 📁 Project Structure

```
blankfactor-cypress/
├── cypress/
│   ├── e2e/
│   │   ├── retirement-journey.cy.js    # Main user journey tests
│   ├── fixtures/
│   │   └── testData.json              # Test data and configurations
│   ├── support/
│   │   ├── page-objects/              # Page Object Model classes
│   │   │   ├── HomePage.js
│   │   │   ├── RetirementPage.js
│   │   │   └── ContactPage.js
│   │   ├── utils/
│   │   │   └── TestUtils.js           # Utility functions
│   │   ├── commands.js                # Custom Cypress commands
│   │   └── e2e.js                     # Test configuration
├── cypress.config.js                  # Cypress configuration
├── package.json                       # Dependencies and scripts
└── README.md                          # This file
```

## 🧪 Running Tests

### Interactive Mode (Test Runner)
```bash
# Open Cypress Test Runner
npm run test:open
```

### Headless Mode
```bash
# Run all tests headlessly
npm test

# Run specific test suite
npm run test:retirement

# Run smoke tests (fast execution)
npm run test:smoke

# Run with specific browser
npm run test:chrome
npm run test:firefox
```

### CI/CD Mode
```bash
# Clean previous results and run tests
npm run test:ci

# Run with parallel execution (requires Cypress Dashboard)
npm run test:parallel
```

## 🏗️ Test Architecture

### Page Object Model

Each page is represented by a class with selectors and actions:

```javascript
import { HomePage } from '../support/page-objects/HomePage.js';

const homePage = new HomePage();
homePage.visit().verifyHeaderVisible().navigateToRetirement();
```

### Custom Commands

Reusable commands for common actions:

```javascript
// URL verification
cy.verifyUrlContains('retirement');

// Element interactions
cy.scrollToElementAndWait('.section', { duration: 1000 });
```

### Data-Driven Testing

Test data stored in fixtures for maintainability:

```javascript
cy.fixture('testData').then((data) => {
  const user = data.users.testUser1;
});
```

## ⚙️ Configuration

### Environment Variables

Set environment-specific configurations:

```bash
# Run tests against staging
npx cypress run --env environment=staging

# Hide XHR requests in command log
npx cypress run --env hideXHRInCommandLog=true
```

### Cypress Configuration

Key configuration options in `cypress.config.js`:

- **baseUrl**: Target website URL
- **viewportWidth/Height**: Browser viewport size
- **defaultCommandTimeout**: Command timeout duration
- **retries**: Test retry configuration
- **video/screenshots**: Recording settings

## 🔧 Custom Commands Reference

| Command | Description | Usage |
|---------|-------------|-------|
| `verifyUrlContains` | Verify URL contains string | `cy.verifyUrlContains('contact')` |
| `fillContactForm` | Fill contact form with data | `cy.fillContactForm(userData)` |
| `scrollToElementAndWait` | Scroll to element with wait | `cy.scrollToElementAndWait('.section')` |
| `getTextAndStore` | Extract text and store as alias | `cy.getTextAndStore('.title', 'titleText')` |

## 📊 Reporting and Debugging

### Screenshots and Videos

- **Screenshots**: Automatically taken on test failures
- **Videos**: Recorded for all test runs in headless mode
- **Location**: `cypress/screenshots/` and `cypress/videos/`

### Debug Mode

```bash
# Run with debug information
DEBUG=cypress:* npm test

# Open DevTools in headed mode
npx cypress run --headed --no-exit
```

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Cypress Tests
on: [push, pull_request]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: cypress-io/github-action@v2
        with:
          start: npm start
          wait-on: 'http://localhost:3000'
          record: true
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-test`)
3. **Commit** your changes (`git commit -m 'Add amazing test'`)
4. **Push** to the branch (`git push origin feature/amazing-test`)
5. **Open** a Pull Request

### Coding Standards

- Use **Page Object Model** for new page interactions
- Add **JSDoc comments** for complex functions
- Follow **existing naming conventions**
- Include **test data** in fixtures when possible
- Write **descriptive test names** and descriptions

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Page Object Model Guide](https://docs.cypress.io/guides/references/trade-offs#Page-objects)
- [Blankfactor Website](https://blankfactor.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Maintained by**: Diego Zaraza  
**Last Updated**: November 2025  
**Cypress Version**: 15.6.0