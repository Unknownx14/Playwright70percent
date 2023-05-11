class DashboardPagePO{

constructor(page)
{
    this.page = page; //To make it reacheable outside this constructor, for other methods in this class
    this.titlesLocator = page.locator('.card-body b');//Here page does not have a life, so we call it in the Constructor from our standalone tc
    this.cardLocator = page.locator(".card");
    this.productCardBodyLocator = page.locator(".card-body");
    this.cartLocator = page.locator("[routerlink*='cart']");
    
}


//Methods

async searchProductAndAddItToCart(wantedProduct)
{
    const titles = await this.titlesLocator.allTextContents();
    console.log(titles);

    const productCardBody = await this.productCardBodyLocator;
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

}

async navigateToCartPage()
{
    //Go to the Cart
    await this.cartLocator.click();
}





}

module.exports = {DashboardPagePO};