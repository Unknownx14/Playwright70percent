class ThankYouPagePO{

constructor(page)
{
    this.page = page; //To make it reacheable outside this constructor, for other methods in this class
    this.orderIDLocator = page.locator("label[class*='ng-star-inserted']");//Here page does not have a life, so we call it in the Constructor from our standalone tc
    this.ordersButtonLocator = page.locator("[routerlink*='myorders']");
    this.tableRowLocator = page.locator("tbody tr");
    
}
//await page.locator("[routerlink*='myorders']").first().click();


//Methods

async getOrderIDTrimmed()
{

    const orderID = await this.orderIDLocator.textContent();
    console.log(orderID);
    //Trimming first and last 3 characters from a string
    const orderIDTrimmed = await orderID.substring(3, orderID.length - 3);
    console.log(orderIDTrimmed+" - orderIDTrimmed");
    return orderIDTrimmed;

}


async goToOrdersPage()
{
    await this.ordersButtonLocator.first().click();
    await this.tableRowLocator.last().waitFor(); //This is just for aditional wait by JK
}





}

module.exports = {ThankYouPagePO};