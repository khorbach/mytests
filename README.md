# **Installation**

1. Clone the repository:
`git clone https://github.com/khorbach/mytests.git`

2. Install the required dependencies:
`npm install`

3. Install Playwright:
`npx playwright install`


# **Running the Tests**

1. Run All Tests:
`npx playwright test`

2. Run e2e.specs.ts or a scecific test file
`npx playwright test e2e.spec.ts`

# **View Test Results**

To open the report:
`npx playwright show-report`

Remove old reports and test artifacts:
`npx playwright test --clean`

# **Writing New Tests**

To add a new test file:

1. Create a new file in the tests/ directory, e.g., tests/newTest.spec.ts.
2. Import test and expect from Playwright:
`import { test, expect } from '@playwright/test';`



