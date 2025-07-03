import { test, expect } from '../node_modules/@playwright/test';

test('проветка значений (833) 556-8550', async ({ page }) => {
     await page.goto('https://development-cds.testpx.com/adt/c/step/1');

     // Перевірка, що на сторінці є текст "(833) 556-8550"
     await expect(page.locator('span.phone')).toHaveText('(833) 556-8550');
});