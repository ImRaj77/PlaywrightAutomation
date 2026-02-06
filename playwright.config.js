// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40 * 1000,       // This is applicable for every step in entire framework   
  // 30 seconds is the default timeout for all tests
  expect: {
    timeout: 50 * 1000,     // This is for assertions
  },

  reporter: 'html',

  use: {
    browserName:'chromium',
    // browserName:'firefox'
    // browserName:'webkik'
    headless : true
  },

});

module.exports = config      // export the config so that it will b availble for all files in entire framework