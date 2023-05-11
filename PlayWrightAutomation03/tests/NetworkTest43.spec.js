const {test, expect, request} = require('@playwright/test'); //These tests are executed in Playwright environment that launches the browser and provides a fresh page to each test.
//expect is for Assertions
//request is for API testing
const {APIUtils02} = require('./Utils/APIUtils02'); //This class is imported

//API tests for the login

//This is javasript object and, in the key:value pairs, the keys do not have to have ""
const loginPayload = {userEmail:"unknownxjk@gmail.com",userPassword:"kojikurac123"};
const placeOrderPayload = {orders:[{country:"Cuba",productOrderedId:"6262e990e26b7e1a10e89bfa"}]};
const fakeMockedPayloadOrders = {data:[],message:"No Orders"};

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




test('Intercept Network Response', async ({browser})=>   //{browser} is a global fixture in this function
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


    //Before clicking on the Orders page, we have to mock this Orders API call by intercepting the response
    //Then we send this mocked response to a browser
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/62ee406ee26b7e1a10f52b06",
               async route=>
                {
                    const responseFromAPI = await page.request.fetch(route.request()); //Page is turned into API, we get the REAL API
                    let body = JSON.stringify(fakeMockedPayloadOrders); //This is for the mocked response body
                    //let body = fakeMockedPayloadOrders; //This is for the mocked response body

                    route.fulfill(
                        {
                            responseFromAPI,
                            body,
                        }
                    ); //We send this API to a browser via fulfill(), and it has this API call and a body with a mocked response
                }
    )


    //Orders page
    
    await page.locator("[routerlink*='myorders']").first().click();
    //await page.pause();
    
    await page.locator(".mt-4.ng-star-inserted").waitFor(); //This is just for aditional wait by JK
    await page.locator("[routerlink*='cart']").last().waitFor(); //This is just for aditional wait by JK
    
    let messageNoOrders = await page.locator(".mt-4").textContent();
    console.log(messageNoOrders+" - JK");
    await page.pause();
    await page.locator("tbody tr").last().waitFor(); //This is just for aditional wait by JK

  


});


