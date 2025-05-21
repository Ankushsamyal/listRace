const { test, expect } = require('@playwright/test');

test.describe('HeroCards Component', () => {

    test.skip('should show pop card ', async ({ page }) => {
        await page.goto("http://localhost:3001");
        await page.locator('[id="AutoComplete-choose-what-to"]').type("food");
        await page.waitForTimeout(2000);  
        await page.locator('[id="Automatic-choose-location"]').type("delhi");
        await page.waitForTimeout(2000);  
        await page.locator('[data-test-id="HeroButton-Button"]').click();
        await page.waitForTimeout(2000);  
        await expect(page.locator('[data_Test_Id="Search-Popover"]')).toBeVisible()
        await expect(page.locator('[data_test_id="Chaat (Pani Puri)"]')).toContainText("Chaat (Pani Puri)")
        await page.waitForTimeout(2000);  

    });
    test('testing amanzon website', async ({ page }) => {
        await page.goto("https://www.amazon.in/?&tag=googhydrabk1-21&ref=pd_sl_5szpgfto9i_e&adgrpid=155259813593&hvpone=&hvptwo=&hvadid=674893540034&hvpos=&hvnetw=g&hvrand=13990373971129535866&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9302611&hvtargid=kwd-64107830&hydadcr=14452_2316413&gad_source=1");
        // await page.waitForTimeout(2000);
        await page.locator('[data-csa-c-slot-id="nav_cs_5"]').click();
        // await page.waitForTimeout(2000);
        await expect(page).toHaveURL("https://www.amazon.in/mobile-phones/b/?ie=UTF8&node=1389401031&ref_=nav_cs_mobiles");
        // await page.waitForTimeout(2000);
    });

});
