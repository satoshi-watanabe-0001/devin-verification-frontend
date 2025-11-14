import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E テスト設定
 * 
 * このファイルはPlaywrightのE2Eテスト実行環境を定義します。
 * 実装ベースのテストシナリオ（e2e-test-scenarios-implementation-based.md）に基づいています。
 */
export default defineConfig({
  testDir: './e2e',
  
  timeout: 30 * 1000,
  
  fullyParallel: true,
  
  forbidOnly: !!process.env.CI,
  
  retries: process.env.CI ? 2 : 0,
  
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    
    trace: 'on',
    
    screenshot: 'on',
    
    video: 'on',
    
    navigationTimeout: 15 * 1000,
    
    actionTimeout: 10 * 1000,
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
      },
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 },
      },
    },

    {
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 5'],
      },
    },

    {
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 12'],
      },
    },

    {
      name: 'iPad',
      use: {
        ...devices['iPad Pro'],
      },
    },
  ],

  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
