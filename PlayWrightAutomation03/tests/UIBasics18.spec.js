const {test, expect} = require('@playwright/test'); //These tests are executed in Playwright environment that launches the browser and provides a fresh page to each test.
//expect is for Assertions

test('Child windows handling', async ({browser})=>   //{browser} is a global fixture in this function
{

    const context = await browser.newContext();   //A fresh browser instance is opened
    const page = await context.newPage();   //On this page we will hit a wanted url
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");

    console.log( await page.title());   //For getting a title of a page

    //Locators - css and xpath - #username or //input[@id='username']
    const userName = page.locator('#username');
    const signInButton = page.locator('#signInBtn');
    const productTitle = page.locator(".card-title a");
    const dropdown = page.locator("//select[@class='form-control']");
    const documentLink = page.locator("a[href*='documents']");


    //Child windows - waitForEvent to open a new page, this we catch as an object [newPage]
    // [newPage] is an array because we do not know how many windows will be opened
    //[newPage01,newPage02,newPage03] if there are 3 new pages that will be opened
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click(),
        ]
    );

    let text = await newPage.locator(".im-para.red").textContent();
    console.log(text);
    

    //Get the email address from this text
    let split01 = text.split("@");
    console.log(split01[0]);
    console.log(split01[1]);

    let split02 = split01[1].split("with");
    console.log(split02[0]);
    console.log(split02[1]);

    let emailUsername = split02[0].trim();
    console.log(emailUsername);


    //Use this emailUsername on the first page as a username
    await  page.locator('#username').type(emailUsername);
    //await page.pause();





});

