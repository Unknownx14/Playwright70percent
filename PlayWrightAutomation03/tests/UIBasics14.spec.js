const {test, expect} = require('@playwright/test'); //These tests are executed in Playwright environment that launches the browser and provides a fresh page to each test.
//expect is for Assertions

test('Login with valid credentials', async ({browser})=>   //{browser} is a global fixture in this function
{

    const context = await browser.newContext();   //A fresh browser instance is opened
    const page = await context.newPage();   //On this page we will hit a wanted url
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");

    console.log( await page.title());   //For getting a title of a page

    //Locators - css and xpath - #username or //input[@id='username']
    const userName = page.locator('#username');
    const signInButton = page.locator('#signInBtn');
    const productTitle = page.locator(".card-title a");

    await page.locator('#username').type("rahulshetty");
    await page.locator('#password').type("learning");
    await page.locator('#signInBtn').click();
    console.log( await page.locator("[style*='block']").textContent());


    //Assertion .toContainText() can have a partial text as well
    await expect(page.locator("[style*='block']")).toContainText("Incorrect"); //Incorrect username/password.

    //type - fill
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signInButton.click();

   // console.log(await page.locator(".card-title a").textContent());   //This will give us all 4 elements with the same locator
   // console.log(await page.locator(".card-title a").nth(0).textContent());   //This will give us an element with the 0 index
   // console.log(await page.locator(".card-title a").first().textContent());   //This will give us the first element

 let nameOfProduct = await page.locator(".card-title a").nth(1).textContent();
   console.log(nameOfProduct);


   //Make an array of all the product titles
   //Problem here is that for .allTextContents() there is no auto-wait in the Playwright, like there is for .textContent()
   //Therefore, we use await page.waitForLoadState("networkidle") when there are API calls in the Network tab;
   //In this case this web application is not service-oriented, therefore we use 
   const allProductTitles = await productTitle.allTextContents();
   console.log(allProductTitles);

});

