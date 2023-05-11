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


    //Orders page
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("tbody tr").last().waitFor(); //This is just for aditional wait by JK


    //OrderID from the responseCO
    console.log(responseCO.orderIdFromResponse+" need this orderID")

    
    //Intercepting API Request call
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=${responseCO.orderIdFromResponse}",
                 route => route.continue({url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=645a4286568c3e9fb167c77d"})
                //This means it will start with my url and will continue with the url given in this route.continue() whisch is Anshika user
                

                
);




    //Before clicking on the View button we have to mock our API Request call in the above lines
    await page.locator("button:has-text('View')").first().click();   //("button:has-text('View)") locator

    await page.pause();

    const message = await page.locator('p.blink_me').textContent();
  expect(message).toBe('You are not authorize to view this order');

  


});


