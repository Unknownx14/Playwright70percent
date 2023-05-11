const {test, expect} = require('@playwright/test'); //These tests are executed in Playwright environment that launches the browser and provides a fresh page to each test.
//expect is for Assertions

test('Login with wrong credentials', async ({browser})=>   //{browser} is a global fixture in this function
{
    
    const context = await browser.newContext();   //A fresh browser instance is opened
    const page = await context.newPage();   //On this page we will hit a wanted url
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");

    console.log( await page.title());   //For getting a title of a page

    //Locators - css and xpath - #username or //input[@id='username']
    await page.locator('#username').type("rahulshetty");
    await page.locator('#password').type("learning");
    await page.locator('#signInBtn').click();
    console.log( await page.locator("[style*='block']").textContent());


    //Assertion .toContainText() can have a partial text as well
    await expect(page.locator("[style*='block']")).toContainText("Incorrect"); //Incorrect username/password.

});

