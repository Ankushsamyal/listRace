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

  reporter: [['html', { outputFolder: 'playwright-report' }]],  
  timeout: 30000, 
});
