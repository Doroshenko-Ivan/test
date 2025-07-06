import { test, expect } from '../node_modules/@playwright/test';
import domains from '../data/domains.json';
import axios from 'axios';
import { allure } from '../node_modules/allure-playwright';



type Domain = {
  url: string;
  expectedTitle?: string;
};

test.describe('Domain Availability and Title Check', () => {
  for (const domain of domains as Domain[]) {
    test(`${domain.url}`, async ({ page }) => {
      allure.epic('Domain Availability');
      allure.feature('Check Title and Accessibility');
      allure.label('domain', domain.url);

      let isAvailable = false;
      let status: number | null = null;
      let errorMsg = '';
      let actualTitle = '';

      try {
        const response = await axios.get(domain.url, { timeout: 5000 });
        status = response.status;
        isAvailable = status >= 200 && status < 300;
      } catch (error: any) {
        if (error.response) {
          status = error.response.status;
        } else {
          errorMsg = error.message;
        }
      }

      allure.step('Check accessibility', () => {
        if (isAvailable) {
          console.log(`${domain.url} - доступен`);
        } else if (status) {
          console.log(`${domain.url} - недоступен (статус: ${status})`);
        } else {
          console.log(`${domain.url} - недоступен (ошибка: ${errorMsg})`);
        }

        expect(isAvailable, `Домен должен быть доступен`).toBeTruthy();
      });

      if (isAvailable && domain.expectedTitle) {
        await page.goto(domain.url);
        actualTitle = await page.title();

        allure.step('Check title', () => {
          const match = actualTitle.trim() === domain.expectedTitle!.trim();
          console.log(`${domain.url} - тайтл: ${match ? 'совпадает' : `не совпадает (ожидался: "${domain.expectedTitle}", получен: "${actualTitle}")`}`);
          expect(actualTitle).toBe(domain.expectedTitle);
        });
      }
    });
  }
});


// Запустить тест через командную строку (npx playwright test)
// запустить алюр через командную строку  (allure serve allure-results)