const {test, expect} = require('@playwright/test'); //These tests are executed in Playwright environment that launches the browser and provides a fresh page to each test.
//expect is for Assertions

test('Login with valid credentials', async ({browser})=>   //{browser} is a global fixture in this function
{

    const context = await browser.newContext();   //A fresh browser instance is opened
    const page = await context.newPage();   //On this page we will hit a wanted url
    await page.goto("https://rahulshettyacademy.com/client/");

    console.log( await page.title());   //For getting a title of a page

    //Locators - css and xpath - #username or //input[@id='username']

    await page.locator("#userEmail").type("unknownxjk@gmail.com");
    await page.locator("#userPassword").type("kojikurac123");
    await page.locator("#login").click();


    //This will wait until network tab comes into the idle state - means wait until all API calls are loaded
    await page.waitForLoadState("networkidle");
   

    const productNames = page.locator("h5 b");
  /*  const productNameFirst = await productNames.nth(0).textContent();
    console.log(productNameFirst);*/

    //Make an array of all the product titles
   //Problem here is that for .allTextContents() there is no auto-wait in the Playwright, like there is for .textContent()
   //Therefore, we use await page.waitForLoadState("networkidle") when there are API calls in the Network tab;
   const allProductNames = await productNames.allTextContents();
   console.log(allProductNames);
 

});

