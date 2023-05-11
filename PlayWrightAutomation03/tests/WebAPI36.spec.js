const {test, expect, request} = require('@playwright/test'); //These tests are executed in Playwright environment that launches the browser and provides a fresh page to each test.
//expect is for Assertions
//request is for API testing


//API tests for the login

//This is javasript object and, in the key:value pairs, the keys do not have to have ""
const loginPayload = {userEmail:"unknownxjk@gmail.com",userPassword:"kojikurac123"};
const placeOrderPayload = {orders:[{country:"Cuba",productOrderedId:"6262e990e26b7e1a10e89bfa"}]};

let tokenFromResponse; //To be a global variable
let orderIdFromResponse; //To be a global variable

test.beforeAll( async ()=>   //This is a test function
{
    
    //Login API
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
    {
        data:loginPayload
    });


    expect((await loginResponse).ok()).toBeTruthy(); //This is an assertion for (200, 201, 204) OK API response

    //Extract the token from the response body, first get a response as json, then get the token
    const loginResponseBodyJson = await loginResponse.json();
     tokenFromResponse = loginResponseBodyJson.token;
    console.log(tokenFromResponse);


    //PlaceOrder API
    const placeOrderResponse =await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data:placeOrderPayload,
        headers:{
                    "Authorization": tokenFromResponse,
                    "Content-Type" : "application/json"
                },
    });

    //Extract the token from the response body, first get a response as json, then get the token
    const placeOrderResponseBodyJson = await placeOrderResponse.json();
     orderIdFromResponse = placeOrderResponseBodyJson.orders[0];
    console.log(orderIdFromResponse);


});




test('Purchase a product with API', async ({browser})=>   //{browser} is a global fixture in this function
{

    /*
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
    */

    //This is to continue with the usage of API for login
    //We need to use javascript expressions, Playwright can execute this javasript expression

    const context = await browser.newContext();   //A fresh browser instance is opened
    const page = await context.newPage();   //On this page we will hit a wanted url

    //page.addInitScript(takes an annonimous function and a parameter)
    page.addInitScript(value => 
        {
            window.localStorage.setItem("token", value);
        }, tokenFromResponse);


    await page.goto("https://rahulshettyacademy.com/client/");





    /*
    await page.locator(".card").last().waitFor(); //This is just for aditional wait by JK
    
    await page.pause();
   const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
   
    //Like in the Selenium where making a list of elements, here we make an array - productCardBody
    const productCardBody = await page.locator(".card-body");

    const wantedProduct = "zara coat 3";
    
    const numberOfProducts = await productCardBody.count();
    for(let i=0;i<numberOfProducts;i++)
    {
        var singleName = await productCardBody.nth(i).locator("b").textContent();
        console.log(singleName);
            if(singleName===wantedProduct)
            {
                await productCardBody.nth(i).locator(".w-10").click();
                //await productCardBody.nth(i).locator("text= Add To Cart").click();
                break;
            }
    }

   // await page.locator("[name='search']").last().fill("unknownxjk@gmail.com");
    //await page.pause();
 

    //Go to the Cart
    await page.locator("[routerlink*='cart']").click();

    await page.locator("li[class*='ng-star-inserted']").first().waitFor(); //This wait is because .isVisible() has no auto-wait

    const isProductAddedToCart = await page.locator("h3:has-text('zara coat 3')").isVisible();
    console.log(isProductAddedToCart);
    expect(isProductAddedToCart).toBeTruthy();

    //Click on the Checkout button and choose a Country
    //await page.locator("button[type='button']").last().click();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder='Select Country']").type("ind", {delay:100});

    const wantedCountry = " India";

    const dropdown = page.locator("[class*='ta-results']");
    await dropdown.waitFor();
    const givenCountries = await dropdown.locator("[class*='list-group-item']").count();

    for(let i=0;i<givenCountries;i++)
    {
        var singleCountry = await dropdown.locator("[class*='list-group-item']").nth(i).textContent();
        console.log(singleCountry);
        if(singleCountry ===wantedCountry)   // if(singleCountry.includes(wantedCountry)) if(singleCountry.trim()===wantedCountry)
        {
            await dropdown.locator("[class*='list-group-item']").nth(i).click();
            break;
        }
    }

    //await page.pause();

    //Verify that the wright email address is displayed and click on the Place Order button
    const myEmail = "unknownxjk@gmail.com";
    const actualEmail = await page.locator("[class*='user__name'] label").textContent();
    console.log(actualEmail);
    await expect( page.locator("[class*='user__name'] label")).toHaveText(myEmail);

    await page.locator(".btnn.action__submit.ng-star-inserted").click();


    //Thank you page
    const expectedThankYou = " Thankyou for the order. ";
    await expect( page.locator(".hero-primary")).toHaveText(expectedThankYou);
    const orderID = await page.locator("label[class*='ng-star-inserted']").textContent();
    console.log(orderID);

    //Trimming first and last 3 characters from a string
    const orderIDTrimmed = orderID.substring(3, orderID.length - 3);
    console.log(orderIDTrimmed);
*/

    //Orders page
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("tbody tr").last().waitFor(); //This is just for aditional wait by JK

    const tableRows = await page.locator("tbody tr");
    //const allTableRows = await tableRows.locator("th");
    const countTableRows = await tableRows.count();
    console.log(countTableRows);

    for(let i=0; i<countTableRows;i++)
    {
        var singleRowOrderID = await tableRows.nth(i).locator("th").textContent();
        console.log(singleRowOrderID);
            if(singleRowOrderID===orderIdFromResponse)   // if(singleRowOrderID.includes(orderID)) this is without trimming
            {
                await tableRows.nth(i).locator("text=View").click();
                break;
            }
    }


    //View order
   console.log( await page.locator(".tagline").textContent());
   const orderIdTYPage = await page.locator(".col-text.-main").textContent()
   console.log(orderIdTYPage);

   await page.pause();
   await expect( orderIdFromResponse.includes(orderIdTYPage)).toBeTruthy(); //Assert.True() in Selenium



});


