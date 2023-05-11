class OrdersPagePO{

constructor(page)
{
    this.page = page; //To make it reacheable outside this constructor, for other methods in this class
    this.tableRowLocator = page.locator("tbody tr");//Here page does not have a life, so we call it in the Constructor from our standalone tc
    
    
}



//Methods

async clickViewOrder(orderIDTrimmed)
{
    const tableRows = await this.tableRowLocator;
    //const allTableRows = await tableRows.locator("th");
    const countTableRows = await tableRows.count();
    console.log(countTableRows);

    for(let i=0; i<countTableRows;i++)
    {
        var singleRowOrderID = await tableRows.nth(i).locator("th").textContent();
        console.log(singleRowOrderID);
            if(singleRowOrderID===orderIDTrimmed)   // if(singleRowOrderID.includes(orderID)) this is without trimming
            {
                await tableRows.nth(i).locator("text=View").click();
                break;
            }
    }


}






}

module.exports = {OrdersPagePO};