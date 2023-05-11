class ViewOrderPagePO{

constructor(page)
{
    this.page = page; //To make it reacheable outside this constructor, for other methods in this class
    this.thankyouLocator = page.locator(".tagline");//Here page does not have a life, so we call it in the Constructor from our standalone tc
    this.orderIdLcoator = page.locator(".col-text.-main");
    
}
/*console.log( await page.locator(".tagline").textContent());
const orderIdTYPage = await page.locator(".col-text.-main").textContent()
console.log(orderIdTYPage);

await expect( orderIDTrimmed.includes(orderIdTYPage)).toBeTruthy(); //Assert.True() in Selenium
*/

//Methods

async verifyOrderSummary()
{

    console.log( await this.thankyouLocator.textContent());
    const orderIdTYPage = await this.orderIdLcoator.textContent()
    console.log(orderIdTYPage+" - orderIdTYPage");
    return orderIdTYPage;


}







}

module.exports = {ViewOrderPagePO};