import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  workers: 1, // Послідовний запуск тестів (1 робітник)
  testDir: './tests', // Шлях до тестів
  timeout: 30 * 1000, // Загальний таймаут для тестів (30 секунд)

  // Глобальні налаштування для всіх проектів


  // Настройки для запуску з Allure
  reporter: [
    ['allure-playwright']
  ],

  // Проект для Chrome

});
