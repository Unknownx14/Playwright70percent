const {test, expect} = require('@playwright/test'); //These tests are executed in Playwright environment that launches the browser and provides a fresh page to each test.
//expect is for Assertions

test("Popup validations", async ({browser})=>   //{browser} is a global fixture in this function
{

    const context = await browser.newContext();   //A fresh browser instance is opened
    const page = await context.newPage();   //On this page we will hit a wanted url
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    console.log( await page.title());   //For getting a title of a page

    //Locators - css and xpath - #username or //input[@id='username']
    await page.locator("#confirmbtn").click();

    //Java popups, here called Dialog
    page.on("dialog", dialog => dialog.accept() ); // page.on("dialog", dialog => dialog.dismiss() );


    //Mouse hover
    /*
    await page.locator("#mousehover").hover();
    await page.locator("a[href*='top']").click();*/


    //iFrames or framesets
    const firstFrame = await page.frameLocator("#courses-iframe");   //Switch to an iFrame

    //If there are 2 element and one is not visible, choose the visible one by adding :visible
    await firstFrame.locator("li a[href*='lifetime-access']:visible").click();

    const expectedH2 = "Join 13,522 Happy Subscibers!";
    const h2Headline = await firstFrame.locator("div[class='text'] h2").textContent();
    console.log(h2Headline);
    console.log(h2Headline.split(" ")[1]);
    
    
   


});