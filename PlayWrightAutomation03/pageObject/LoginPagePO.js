class LoginPagePO{

constructor(page)
{
    this.page = page;//To make it reacheable outside this constructor, for other methods in this class
    this.loginButton = page.locator("#login"); //Here page does not have a life, so we call it in the Constructor from our standalone tc
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
}


//Methods

async loginMethod(userName, password)
{
    await this.userName.type(userName);
    await this.password.type(password);
    await this.loginButton.click();
    //This will wait until network tab comes into the idle state - means wait until all API calls are loaded
    await this.page.waitForLoadState("networkidle");
}


async goTo()
{
    await this.page.goto("https://rahulshettyacademy.com/client/");
}


}

module.exports = {LoginPagePO};