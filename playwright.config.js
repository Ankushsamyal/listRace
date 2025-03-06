const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Define the projects (e.g., Desktop Chrome, Mobile Safari)
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },  // Use Chrome's desktop emulation
    },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },  // Use iPhone 12 emulation
    // },
  ],

  // Configure the test reporter to generate an HTML report
  reporter: [['html', { outputFolder: 'playwright-report' }]],  // HTML report in the 'playwright-report' folder

  // Optional: Set the timeout and other test settings
  timeout: 30000, // 30 seconds timeout for each test
});
