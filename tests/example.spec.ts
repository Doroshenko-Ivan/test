import { test, expect } from '../node_modules/@playwright/test';

test('Проветка тайтла ADT DIY Starting at $198*', async ({ page }) => {
     await page.goto('https://development-cds.testpx.com/adt/c/step/1');

     // Перевірка, що будь-де є фраза (незалежно від тегу)
     await expect(page.locator('p.title')).toContainText('ADT DIY Starting at $198*');
});