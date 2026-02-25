const {test, expect} = require('@playwright/test');

test('Rahulshetty Client App Playwright test', async ({page}) =>
{
    
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
    await page.locator("#userEmail").fill("rajtidke77@gmail.com");
    await page.locator("#userPassword").fill("Udemy@77");
    await page.locator("[value='Login']").click();

    await page.waitForLoadState('networkidle');                // wait for all the newtwork calls to complete
    await page.locator(".card-body b").first().waitFor();      // It will wait for the 1st element to apear on DOM
    await page.locator(".card-body b").last().waitFor();       // It will wait for the last element to apear on DOM
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    // Zara Coat 4
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    const count = await products.count();
    for(let i=0; i<count; i++){
        await page.locator(".card-body b").last().waitFor();
        if (await products.nth(i).locator("b").textContent() === productName){
            // add to cart logic
            await page.locator(".card-body").nth(i).locator("text=Add To Cart").click();
            break;
        }
    }    
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").last().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();

    await page.locator("[placeholder='Select Country']").pressSequentially("Ind", {delay:250});
    const dropDown = page.locator(".ta-results");
    await dropDown.first().waitFor();

    const optionsCount = await dropDown.locator("button").count();
    for(let i=0; i<optionsCount; i++){
        const text = await dropDown.locator("button").nth(i).textContent();
        console.log(text);
        if(text === " India"){
            await dropDown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText("rajtidke77@gmail.com");
    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody tr").last().waitFor();
    const rows = await page.locator("tbody tr");
    for(let i=0; i<await rows.count(); i++){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            console.log("Inside")
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
    await page.pause();
});