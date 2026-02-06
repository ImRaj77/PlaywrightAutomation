const {test, expect} = require('@playwright/test');

test.only('Rahulshetty Client App Playwright test', async ({page}) =>
{
    
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
    await page.locator("#userEmail").fill("rajtidke77@gmail.com");
    await page.locator("#userPassword").fill("Udemy@77");
    await page.locator("[value='Login']").click();

    await page.waitForLoadState('networkidle');                // wait for all the newtwork calls to complete
    await page.locator(".card-body b").first().waitFor();      // It will wait for the 1st element to apear on DOM
    await page.locator(".card-body b").last().waitFor();       // It will wait for the last element to apear on DOM
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    
});