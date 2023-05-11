const {LoginPagePO} = require('./LoginPagePO'); //This is like imports in Java for importing a class
const {DashboardPagePO} = require('./DashboardPagePO'); //This is like imports in Java for importing a class
const {MyCartPagePO} = require('./MyCartPagePO'); //This is like imports in Java for importing a class
const {PaymentPagePO} = require('./PaymentPagePO'); //This is like imports in Java for importing a class
const {ThankYouPagePO} = require('./ThankYouPagePO'); //This is like imports in Java for importing a class
const {OrdersPagePO} = require('./OrdersPagePO'); //This is like imports in Java for importing a class
const {ViewOrderPagePO} = require('./ViewOrderPagePO'); //This is like imports in Java for importing a class




class POManager
{


    constructor(page)
    {
        this.page = page;//To make it reacheable outside this constructor, for other methods in this class
        this.lppo = new LoginPagePO(this.page);
        this.dppo = new DashboardPagePO(this.page);
        this.mcpo = new MyCartPagePO(this.page);
        this.pppo = new PaymentPagePO(this.page);
        this.typo = new ThankYouPagePO(this.page);
        this.oppo = new OrdersPagePO(this.page);
        this.vppo = new ViewOrderPagePO(this.page);

    }


    getLoginPage()
    {
        return this.lppo;
    }

    getDashboardPage()
    {
        return this.dppo;
    }

    getMyCartPage()
    {
        return this.mcpo;
    }

    getPaymentPage()
    {
        return this.pppo;
    }

    getThankYouPage()
    {
        return this.typo;
    }

    getOrdersPage()
    {
        return this.oppo;
    }

    getViewOrderPage()
    {
        return this.vppo;
    }
    


}

module.exports = {POManager};