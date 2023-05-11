class MyCartPagePO{

constructor(page)
{
    this.page = page; //To make it reacheable outside this constructor, for other methods in this class
    this.myCartRowLocator = page.locator("li[class*='ng-star-inserted']");//Here page does not have a life, so we call it in the Constructor from our standalone tc
    this.zaraCoat3InCartLocator = page.locator("h3:has-text('zara coat 3')");
    this.checkoutButtonLocator = page.locator("text=Checkout");
    
}

/*
//Go to the Cart
    await page.locator("[routerlink*='cart']").click();

    await page.locator("li[class*='ng-star-inserted']").first().waitFor(); //This wait is because .isVisible() has no auto-wait

    const isProductAddedToCart = await page.locator("h3:has-text('zara coat 3')").isVisible();
    console.log(isProductAddedToCart);
    expect(isProductAddedToCart).toBeTruthy();
    */

//Methods

 getWantedProductLocator(wantedProduct)
{
    return this.page.locator("h3:has-text('"+wantedProduct+"')");   
}


async isWantedProductInCart02(wantedProduct)
{
    await this.myCartRowLocator.first().waitFor(); //This wait is because .isVisible() has no auto-wait
    const isProductAddedToCart = await this.getWantedProductLocator(wantedProduct).isVisible();
    console.log(isProductAddedToCart);
    return isProductAddedToCart;

}


async isWantedProductInCart()
{
    await this.myCartRowLocator.first().waitFor(); //This wait is because .isVisible() has no auto-wait
    const isProductAddedToCart = await this.zaraCoat3InCartLocator.isVisible();
    console.log(isProductAddedToCart);
    return isProductAddedToCart;

}


async clickCheckoutButton()
    {
        await this.checkoutButtonLocator.click();
    }



}

module.exports = {MyCartPagePO};