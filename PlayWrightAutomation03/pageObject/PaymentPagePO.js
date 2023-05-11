class PaymentPagePO{

constructor(page)
{
    this.page = page; //To make it reacheable outside this constructor, for other methods in this class
    this.selectCountryLocator = page.locator("[placeholder='Select Country']");//Here page does not have a life, so we call it in the Constructor from our standalone tc
    this.dropdownSelectCountryLocator = page.locator("[class*='ta-results']");
    this.emailLocator = page.locator("[class*='user__name'] label");
    this.placeOrderButtonLocator = page.locator(".btnn.action__submit.ng-star-inserted");
    
}



//Methods

async selectCountry(wantedCountry)
{
    await this.selectCountryLocator.type("ind", {delay:100});
    const dropdown = await this.dropdownSelectCountryLocator;
    await dropdown.waitFor();
    const givenCountries = await dropdown.locator("[class*='list-group-item']").count();
    const listedCountriesFromDropdownLocator = await dropdown.locator("[class*='list-group-item']");


    for(let i=0;i<givenCountries;i++)
    {
        var singleCountry = await listedCountriesFromDropdownLocator.nth(i).textContent();
        console.log(singleCountry);
        if(singleCountry ===wantedCountry)   // if(singleCountry.includes(wantedCountry)) if(singleCountry.trim()===wantedCountry)
        {
            await listedCountriesFromDropdownLocator.nth(i).click();
            break;
        }
    }


}


async checkUserEmailForShipping()
{

    const actualEmail = await this.emailLocator.textContent();
    console.log(actualEmail);
    return this.emailLocator;

}


async clickPlaceOrderButton()
{
    await this.placeOrderButtonLocator.click();
}







}

module.exports = {PaymentPagePO};