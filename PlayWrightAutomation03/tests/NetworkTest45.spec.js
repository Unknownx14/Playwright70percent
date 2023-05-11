const {test, expect} = require('@playwright/test'); //These tests are executed in Playwright environment that launches the browser and provides a fresh page to each test.
//expect is for Assertions

test('UI controls', async ({browser})=>   //{browser} is a global fixture in this function
{

    const context = await browser.newContext();   //A fresh browser instance is opened
    const page = await context.newPage();   //On this page we will hit a wanted url


    //Abort something from the Network tab, e.g. block any url with the .css extension
 //   page.route("**/*.{jpg,png,jpeg}",   // "**/*.css" 
 //   route => route.abort()
 //   );


    //This will listen to this request(calls on the Network tab) call and get all the url
    page.on('request', request=> console.log(request.url()));

    //This will listen to this response(calls on the Network tab) call and get all the url and status code
    page.on('response', response=> console.log( response.url(), response.status()));


    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");

    console.log( await page.title());   //For getting a title of a page

    //Locators - css and xpath - #username or //input[@id='username']
    const userName = page.locator('#username');
    const signInButton = page.locator('#signInBtn');
    const productTitle = page.locator(".card-title a");
    const dropdown = page.locator("//select[@class='form-control']");
    const documentLink = page.locator("a[href*='documents']");

    await page.locator('#username').type("rahulshetty");
    await page.locator('#password').type("learning");


    //Static dropdown - here we place "value" taht we want to be selected
    await dropdown.selectOption("consult");
    


    //Radiobutton
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    //await page.pause();

    //Assertions
    await expect(page.locator('.radiotextsty').last()).toBeChecked(); //This is the real assertion
    let booleanIsChecked = page.locator('.radiotextsty').last().isChecked(); //This is just for printing the boolean whether this radiobutton is checked
    await console.log(await booleanIsChecked);
    await console.log(await page.locator('.radiotextsty').last().isChecked());
    //await page.pause();


    //Checkbox
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked(); //This is the real assertion
    await page.locator('#terms').uncheck();
     expect(await page.locator('#terms').isChecked()).toBeFalsy(); //This is the real assertion expecting to be False
    await expect(page.locator('#terms')).not.toBeChecked(); //This is the real assertion


    //Assert if an attribute has expected value class="blinkingText"
    await expect(documentLink).toHaveAttribute("class", "blinkingText");



    await page.locator('#signInBtn').click();
    console.log( await page.locator("[style*='block']").textContent());


    //Assertion .toContainText() can have a partial text as well
    await expect(page.locator("[style*='block']")).toContainText("Incorrect"); //Incorrect username/password.

    //type - fill
    await userName.fill("");
    await userName.fill("rahulshettyacademy");

    await Promise.all(
        [
             page.waitForURL('**/angularpractice/shop'),
             signInButton.click(),
        ]
    );
    




});


//   npx playwright test tests/UIBasics20 --debug