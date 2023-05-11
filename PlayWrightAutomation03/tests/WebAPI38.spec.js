const {test, expect, request} = require('@playwright/test'); //These tests are executed in Playwright environment that launches the browser and provides a fresh page to each test.
//expect is for Assertions
//request is for API testing
const {APIUtils02} = require('./Utils/APIUtils02'); //This class is imported

//API tests for the login

//This is javasript object and, in the key:value pairs, the keys do not have to have ""
const loginPayload = {userEmail:"unknownxjk@gmail.com",userPassword:"kojikurac123"};
const placeOrderPayload = {orders:[{country:"Cuba",productOrderedId:"6262e990e26b7e1a10e89bfa"}]};

let tokenFromResponse; //To be a global variable
let orderIdFromResponse; //To be a global variable
let responseCO; //Those 2 above are not needed now

test.beforeAll( async ()=>   //This is a test function
{
    
    //Login API
    const apiContext = await request.newContext();
    const objectAPIUtils02 =new APIUtils02(apiContext, loginPayload); //Object of this APIUtils02 class
    //orderIdFromResponse = objectAPIUtils02.createOrder(placeOrderPayload);
    responseCO = await objectAPIUtils02.createOrder(placeOrderPayload); //The above line is replaced with this
    


    //PlaceOrder API
    


});




test('Purchase a product with API', async ({browser})=>   //{browser} is a global fixture in this function
{

    //These 2 lines are no more required because they are in the Before Method now
    //const objectAPIUtils = new APIUtils(apiContext, loginPayload); //This will be sent via the Constructor
    //const orderIdFromResponse = createOrder(placeOrderPayload);

    //This is to continue with the usage of API for login
    //We need to use javascript expressions, Playwright can execute this javasript expression

    const context = await browser.newContext();   //A fresh browser instance is opened
    const page = await context.newPage();   //On this page we will hit a wanted url

    //page.addInitScript(takes an annonimous function and a parameter)
    page.addInitScript(value => 
        {
            window.localStorage.setItem("token", value);
        }, responseCO.tokenFromResponse); //tokenFromResponse


    await page.goto("https://rahulshettyacademy.com/client/");



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
            if(singleRowOrderID===responseCO.orderIdFromResponse)   // if(singleRowOrderID.includes(orderID)) this is without trimming
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
   await expect( responseCO.orderIdFromResponse.includes(orderIdTYPage)).toBeTruthy(); //Assert.True() in Selenium



});


