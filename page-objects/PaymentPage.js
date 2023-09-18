import { expect } from '@playwright/test';

export class PaymentPage {
    constructor(page) {
        this.page = page;
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]');
        this.discountCodeInput = page.locator('[data-qa="discount-code-input"]');
        this.discountButton = page.locator('[data-qa="submit-discount-button"]');
        this.discountMessage = page.locator('[data-qa="discount-active-message"]');
        this.newValue = page.locator('[data-qa="total-with-discount-value"]');
        this.previousValue = page.locator('[data-qa="total-value"]');
        this.ownerName = page.locator('[data-qa="credit-card-owner"]');
        this.cardNumber = page.locator('[data-qa="credit-card-number"]');
        this.expireDate = page.locator('[data-qa="valid-until"]');
        this.cvc = page.locator('[data-qa="credit-card-cvc"]');
        this.payButton = page.locator('[data-qa="pay-button"]');
    }

    getDiscountCode = async () => {
        await this.discountCode.waitFor();
        const code = await this.discountCode.innerText();

        await this.discountCodeInput.fill(code);
        await expect(this.discountCodeInput).toHaveValue(code);
        await this.discountButton.click();

        await this.previousValue.waitFor();
        await this.newValue.waitFor();

        await this.discountMessage.waitFor();

        const values = [
            await this.previousValue.innerText(), 
            await this.newValue.innerText()
        ]

        const justNumbers = values.map((element) => {
            const number = parseInt(element.replace('$', ''), 10);
            return number;
        })

        await expect(justNumbers[0]).toBeGreaterThan(justNumbers[1]);
    }

    fillPaymentDetails = async(paymentDetails) => {
        await this.ownerName.waitFor();
        await this.cardNumber.waitFor();
        await this.expireDate.waitFor();
        await this.cvc.waitFor();
        await this.payButton.waitFor();

        await this.ownerName.fill(paymentDetails.owner);
        await this.cardNumber.fill(paymentDetails.creditCardNumber);
        await this.expireDate.fill(paymentDetails.creditCardExpireDate);
        await this.cvc.fill(paymentDetails.cvc);

        await this.payButton.click();
        await this.page.waitForURL('/thank-you');
    }
}