import { expect } from "@playwright/test";

export class Checkout {
    constructor(page) {
        this.page = page;
        this.basketCard = page.locator('[data-qa="basket-card"]'); 
        this.itemPrice = page.locator('[data-qa="basket-item-price"]');
        this.itemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]');
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]');
        
    }

    removeCheapestProducts = async () => {
        await this.basketCard.first().waitFor();
        const countBeforeRemoving = await this.basketCard.count();
        await this.itemPrice.first().waitFor();
        await this.itemRemoveButton.first().waitFor();

        const allPrices = await this.itemPrice.allInnerTexts();
        const justNumbers = allPrices.map((element) => {
            const numbers = parseInt(element.replace("$", ""), 10);
            
            return numbers;
            
        })

        const smallestPriceIdx = justNumbers.indexOf(Math.min(justNumbers));
        await this.itemRemoveButton.nth(smallestPriceIdx).click();
        await expect(this.basketCard).toHaveCount(countBeforeRemoving - 1)

    }

    continueToCheckout = async () => {
        await this.continueToCheckoutButton.waitFor()
        await this.continueToCheckoutButton.click();
        await this.page.waitForURL(/\/login/, {timeout: 5000});
    }

    
}