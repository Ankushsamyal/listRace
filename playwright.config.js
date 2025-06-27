const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] }, 
    },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] }, 
    // },
  ],

  reporter: [['html', { outputFolder: 'playwright-report' }]],  
  timeout: 30000, 
});
