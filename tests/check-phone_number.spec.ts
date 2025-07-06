import { test, expect } from '../node_modules/@playwright/test';
import elements from '../data/elements.json'
import { allure } from '../node_modules/allure-playwright';



type Element = {
     loc: string;
     text: string;
};

test.describe('Проверка значений элементов', () => {
     (elements as Element[]).forEach((element) => {
          test(`Проверка значения элемента для ${element.loc}`, async ({ page }) => {
               allure.epic('Domain Availability');
               allure.feature('Check Title and Accessibility');
               allure.label('domain', element.loc);

               await page.goto('https://development-cds.testpx.com/adt/c/step/1');
               await expect(page.locator('span.phone')).toHaveText('(833) 556-8550');
          });
     });
});


