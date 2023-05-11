const base = require('@playwright/test'); //These tests are executed in Playwright environment that launches the browser and provides a fresh page to each test.


exports.customtest = base.test.extend(

{

    testDataForOrder : {

        userName : "unknownxjk@gmail.com",
        password : "kojikurac123",
        wantedProduct : "zara coat 3"
        }
}

)