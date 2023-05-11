const {test, expect} = require('@playwright/test'); //These tests are executed in Playwright environment that launches the browser and provides a fresh page to each test.
//expect is for Assertions

test("Popup validations", async ({browser})=>   //{browser} is a global fixture in this function
{

    const context = await browser.newContext();   //A fresh browser instance is opened
    const page = await context.newPage();   //On this page we will hit a wanted url
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  /*  await page.goto("https://google.com");
    await page.goBack();
    await page.goForward();*/

    console.log( await page.title());   //For getting a title of a page

    //Locators - css and xpath - #username or //input[@id='username']
    const boxElement = await page.locator("#displayed-text");
    expect(boxElement).toBeVisible();

    await page.locator("#hide-textbox").click();
    expect(boxElement).toBeHidden();
   


});