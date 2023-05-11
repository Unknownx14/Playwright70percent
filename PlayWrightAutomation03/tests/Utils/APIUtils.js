class APIUtils
{


    //A Construcot is needed in order to call const apiContext = await request.newContext(); from a TC
    constructor(apiContext, loginPayload)
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }


    //A method for getting a token
    async getToken()
    {


        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", //await apiContext.post(
    {
        data:this.loginPayload
    });


    expect((await loginResponse).ok()).toBeTruthy(); //This is an assertion for (200, 201, 204) OK API response

    //Extract the token from the response body, first get a response as json, then get the token
    const loginResponseBodyJson = await loginResponse.json();
     tokenFromResponse = loginResponseBodyJson.token;
    console.log(tokenFromResponse);

    return tokenFromResponse;

    }



    //A method for creating an order
    async createOrder(placeOrderPayload)
    {

        const placeOrderResponse =await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", //await apiContext.post(
    {
        data:placeOrderPayload,
        headers:{
                    "Authorization": this.getToken(),   //"Authorization": tokenFromResponse,
                    "Content-Type" : "application/json"
                },
    });

    //Extract the token from the response body, first get a response as json, then get the token
    const placeOrderResponseBodyJson = await placeOrderResponse.json();
     orderIdFromResponse = placeOrderResponseBodyJson.orders[0];
    console.log(orderIdFromResponse);

    return orderIdFromResponse;


    }



}


module.exports = {APIUtils}; //This class is now globaly visible to this project