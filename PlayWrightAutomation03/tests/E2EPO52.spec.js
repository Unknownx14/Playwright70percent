const {test, expect} = require('@playwright/test'); //These tests are executed in Playwright environment that launches the browser and provides a fresh page to each test.
//expect is for Assertions

const dataSet = JSON.parse(JSON.stringify(require('./Utils/placeOrderTestData.json'))); //Import the Json file and convert it into a JS object
//Import the Json file and convert it into a String, then this String convert into a JS object

/*
const {LoginPagePO} = require('../pageObject/LoginPagePO'); //This is like imports in Java for importing a class
const {DashboardPagePO} = require('../pageObject/DashboardPagePO'); //This is like imports in Java for importing a class
const {MyCartPagePO} = require('../pageObject/MyCartPagePO'); //This is like imports in Java for importing a class
const {PaymentPagePO} = require('../pageObject/PaymentPagePO'); //This is like imports in Java for importing a class
*/

//Instead of importing all these classes, we uste the following PO Manager
const {POManager} = require('../pageObject/POManager');



test('Purchase a product', async ({browser})=>   //{browser} is a global fixture in this function
{

    const context = await browser.newContext();   //A fresh browser instance is opened
    const page = await context.newPage();   //On this page we will hit a wanted url

    //POManager object
    const poManagerObject = new POManager(page);


    //Login page
    const lppo = poManagerObject.getLoginPage();   //const lppo = new LoginPagePO(page);
    await lppo.goTo(); //Use await if this is an async method in the PO

    console.log( await page.title());   //For getting a title of a page

    //Locators - css and xpath - #username or //input[@id='username']
   // const userName = "unknownxjk@gmail.com";
   // const password = "kojikurac123";

    await lppo.loginMethod(dataSet.userName, dataSet.password);   //await lppo.loginMethod(userName, password);

    await page.locator(".card").last().waitFor(); //This is just for aditional wait by JK
    
    await page.pause();


    //DashboardPage
    const dppo = poManagerObject.getDashboardPage();   //const dppo = new DashboardPagePO(page)

   // const wantedProduct = "zara coat 3";

    await dppo.searchProductAndAddItToCart(dataSet.wantedProduct);
    await dppo.navigateToCartPage();

    
    //My Cart page
    const mcpo = poManagerObject.getMyCartPage();   //const mcpo = new MyCartPagePO(page);
    
    await expect(mcpo.isWantedProductInCart02(dataSet.wantedProduct)).toBeTruthy();   //await expect(mcpo.isWantedProductInCart()).toBeTruthy();
    await mcpo.clickCheckoutButton();


    //Click on the Checkout button and choose a Country
    //await page.locator("button[type='button']").last().click();

    //Payment page
    const pppo = poManagerObject.getPaymentPage();   //const pppo = new PaymentPagePO(page);

    const wantedCountry = " India";
    await pppo.selectCountry(wantedCountry);

    //Verify that the wright email address is displayed and click on the Place Order button
    await pppo.checkUserEmailForShipping();
    await expect( page.locator("[class*='user__name'] label")).toHaveText(dataSet.userName);
    await pppo.clickPlaceOrderButton();


    //Thank you page
    const typo = poManagerObject.getThankYouPage();   //const pppo = new PaymentPagePO(page);

    const expectedThankYou = " Thankyou for the order. ";
    await expect( page.locator(".hero-primary")).toHaveText(expectedThankYou);

    const orderIDTrimmed = await typo.getOrderIDTrimmed();
    await typo.goToOrdersPage();

    //Orders page
    const oppo = poManagerObject.getOrdersPage();   //const pppo = new PaymentPagePO(page);

    await oppo.clickViewOrder(orderIDTrimmed);


    //View order page
    const vppo = poManagerObject.getViewOrderPage();   //const pppo = new PaymentPagePO(page);


    const orderIdTYPage = await vppo.verifyOrderSummary();


   await expect(await orderIDTrimmed.includes(orderIdTYPage)).toBeTruthy(); //Assert.True() in Selenium




});


