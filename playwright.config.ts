import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  workers: 1, // Послідовний запуск тестів (1 робітник)
  testDir: './tests', // Шлях до тестів
  timeout: 30 * 1000, // Загальний таймаут для тестів (30 секунд)

  // Глобальні налаштування для всіх проектів
  use: {
    browserName: 'chromium',
    headless: false,
    viewport: { width: 1920, height: 1080 }, // Стандартний розмір вікна
    ignoreHTTPSErrors: true,
    bypassCSP: true,
    launchOptions: {
      args: [
        '--ignore-certificate-errors',
        '--incognito',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ],
    },
    trace: 'on-first-retry', // Записувати трейс для першої спроби повтору
    video: 'on-first-retry', // Записувати відео для першої спроби повтору
    screenshot: 'on', // Зберігати скріншоти
    baseURL: 'http://localhost:3000', // Базовий URL для тестів
  },

  // Настройки для запуску з Allure
  reporter: [
    ['allure-playwright'],
    ['html']
  ],

  // Проект для Chrome
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
