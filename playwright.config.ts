import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['list'], ['allure-playwright']],
  timeout: 30000,
});

