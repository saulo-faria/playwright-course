import { expect } from '@playwright/test';

export class DeliveryDetails {
    constructor(page) {
        this.page = page;
        this.firstName = page.getByPlaceholder('First name');
        this.lastName = page.getByPlaceholder('Last name');
        this.street = page.getByPlaceholder('Street');
        this.postCode = page.getByPlaceholder('Post code');
        this.city = page.getByPlaceholder('City');
        this.dropDown = page.locator('[data-qa="country-dropdown"]');
        this.saveAddressButton = page.locator('[data-qa="save-address-button"]');
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]');
        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]');
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]');
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]');
        this.savedAddressPostCode = page.locator('[data-qa="saved-address-postcode"]');
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]');
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]');
        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' });
    }

    fillDetails = async(deliveryDetails) => {

        await this.page.waitForURL(/\/delivery-details/, {timeout: 5000});

        await this.firstName.waitFor();
        await this.lastName.waitFor();
        await this.street.waitFor();
        await this.postCode.waitFor();
        await this.city.waitFor();
        await this.dropDown.waitFor();

        await this.firstName.fill(deliveryDetails.firstName);
        await this.lastName.fill(deliveryDetails.lastName);
        await this.street.fill(deliveryDetails.street);
        await this.postCode.fill(deliveryDetails.postCode);
        await this.city.fill(deliveryDetails.city);
        await this.dropDown.selectOption(deliveryDetails.country);

    }

    saveDetails = async () => {

        const savedAddressBeforeChecking = await this.savedAddressContainer.count();        

        if(savedAddressBeforeChecking > 0) {
            await this.savedAddressContainer.waitFor();
        };

        await this.saveAddressButton.waitFor();
        await this.saveAddressButton.click();

        await this.savedAddressContainer.first().waitFor();  
        await expect(this.savedAddressContainer).toHaveCount(savedAddressBeforeChecking + 1);

        await this.savedAddressFirstName.first().waitFor();
        await this.savedAddressLastName.first().waitFor();
        await this.savedAddressStreet.first().waitFor();
        await this.savedAddressPostCode.first().waitFor();
        await this.savedAddressCity.first().waitFor();
        await this.savedAddressCountry.first().waitFor();

        expect(await this.savedAddressFirstName.innerText()).toBe(await this.firstName.inputValue());
        expect(await this.savedAddressLastName.innerText()).toBe(await this.lastName.inputValue());
        expect(await this.savedAddressStreet.innerText()).toBe(await this.street.inputValue());
        expect(await this.savedAddressPostCode.innerText()).toBe(await this.postCode.inputValue());
        expect(await this.savedAddressCity.innerText()).toBe(await this.city.inputValue());
        expect(await this.savedAddressCountry.innerText()).toBe(await this.dropDown.inputValue());
    }

    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor();
        await this.continueToPaymentButton.click(); 
        await this.page.waitForURL("/payment");
    }
}