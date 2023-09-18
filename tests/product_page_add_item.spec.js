import { test, expect } from "@playwright/test"

test.skip("Product Page Add to Basket", async({ page }) => {
    await page.goto("/");
    //await page.pause();

    const addToBasketButton = page.locator('div').filter({ hasText: /^499\$Add to Basket$/ }).getByRole('button').first();
    await addToBasketButton.waitFor();  

    await page.waitForTimeout(5000);
    await addToBasketButton.click();

    const RemoveFromBasket = page.getByRole('button', { name: 'Remove from Basket' });   
    await expect(RemoveFromBasket).toHaveText("Remove from Basket");

    const itemsCounter = page.locator("[data-qa=header-basket-count]");
    await expect(itemsCounter).toHaveText('1');

    const linkCheckOut = page.getByRole('link', {name: 'Checkout'});
    await linkCheckOut.waitFor();
    await linkCheckOut.click();
    await page.waitForURL("/basket");

    //await page.waitForTimeout(3000);
    //page.close();
});