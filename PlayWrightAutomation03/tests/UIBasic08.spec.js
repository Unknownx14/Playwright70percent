const {test, expect} = require('@playwright/test'); //These tests are executed in Playwright environment that launches the browser and provides a fresh page to each test.
//expect is for Assertions

test('Browser Context Playwright test JK', async ({browser})=>   //{browser} is a global fixture in this function
{
    
    const context = await browser.newContext();   //A fresh browser instance is opened
    const page = await context.newPage();   //On this page we will hit a wanted url
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");

    console.log( await page.title());   //For getting a title of a page

});


test('Page Context Playwright test JK', async ({page})=>   //{browser} is a global fixture in this function
{
    //{page} means that we do not need the 2 lines below
  //  const context = await browser.newContext();   //A fresh browser instance is opened
  //  const page = await context.newPage();   //On this page we will hit a wanted url
    await page.goto("https://www.nba.com");

   console.log( await page.title());
   await expect(page).toHaveTitle("The official site of the NBA for the latest NBA Scores, Stats & News. | NBA.com");   //Assertion

});


//   npx playwright test tests/UIBasics16 --debug