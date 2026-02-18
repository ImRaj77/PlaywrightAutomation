const {test, expect} = require('@playwright/test');

test('Browser context Playwright test', async ({browser}) =>
{
    // browser - is fixture - should be in {} to recognize as playwright fixture
    // playwright code will go here
    // await - will get activated when we make function as async

    // Chrome
    const context = await browser.newContext();   // create new context
    const page = await context.newPage();         // New page will created
    // We can skip above 2 steps to launch the default page by simply passing page with browser context at top
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    
    // CSS and XPAth
    const userNameField = page.locator("#username");
    const passwordField = page.locator("[type='password']");
    const signInButton = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    await userNameField.fill("rahulshetty");
    await passwordField.fill("learning");
    await signInButton.click();
    
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password");

    await userNameField.fill("");
    await userNameField.fill("rahulshettyacademy");
    await passwordField.fill("");
    await passwordField.fill("Learning@830$3mK2");
    await signInButton.click();
    
    // console.log(await page.locator(".card-body a").first().textContent());       - give the 1st value 
    // console.log(await page.locator(".card-body a").last().textContent());        - give the last value 
    console.log(await cardTitles.nth(0).textContent());                             //- give the nth value
    console.log(await cardTitles.nth(1).textContent());
    console.log(await cardTitles.nth(2).textContent()); 
    console.log(await cardTitles.last().textContent()); 

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);



});

// test.only -  It will execute a single test from the framework
test('UI Controls test', async ({page}) =>
{
    // browser - is fixture - should be in {} to recognize as playwright fixture
    // playwright code will go here
    // await - will get activated when we make function as async

    // Chrome
    // const context = await browser.newContext();   // create new context
    // const page = await context.newPage();         // New page will created
    // We can skip above 2 steps to launch the default page by simply passing page fixture with browser context at top
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    // CSS and XPAth
    const userNameField = page.locator("#username");
    const passwordField = page.locator("[type='password']");
    const signInButton = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");

    await dropdown.selectOption("consult");
    
    await page.locator(".radiotextsty").nth(1).click();
    await page.locator("#okayBtn").click();

    await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
    console.log(await page.locator(".radiotextsty").nth(1).isChecked());

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute("class", "blinkingText");

    // const cardTitles = page.locator(".card-body a");
    // await userNameField.fill("rahulshetty");
    // await passwordField.fill("learning");
    // await signInButton.click();
    //page.pause();
});

test.only('Child windows handling test', async ({browser}) =>
{
    const context = await browser.newContext();   // create new context
    const page = await context.newPage();         // New page will created

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userNameField = page.locator("#username");
    const passwordField = page.locator("[type='password']");
    const signInButton = page.locator("#signInBtn");

    const documentLink = page.locator("[href*='documents-request']");
    // the steps to w
    const [newPage] = await Promise.all(
        [ context.waitForEvent('page'),               // listen for any new page
            documentLink.click(),                      // new page is opened
        ]
    )     
    
    const text = await newPage.locator(".red").textContent();   // to grab the dom content normally
    console.log(text);
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);

    await userNameField.fill(domain);
    console.log(await userNameField.inputValue());   // to grab the value which has entred after dom opened
    
});