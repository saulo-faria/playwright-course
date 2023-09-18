import { expect } from '@playwright/test';
import { Navigation } from './Navigation';

export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.addToBasket = page.locator('[data-qa="product-button"]');
        this.sortDropDown = page.locator('[data-qa="sort-dropdown"]');
        this.productsTitle = page.locator('[data-qa="product-title"]');
        
    }

    visit = async () => {
        await this.page.goto('/');
    }
    

    addProductsBasket = async (index) => {
        const specificButton = this.addToBasket.nth(index);
        await specificButton.waitFor();
        await expect(specificButton).toHaveText('Add to Basket');

        const navigation = new Navigation(this.page);

        const countBeforeAdding = await navigation.getBAsketCount();
        await specificButton.click();
        await expect(specificButton).toHaveText('Remove from Basket');
        const countAfterAdding = await navigation.getBAsketCount();

        await expect(countAfterAdding).toBeGreaterThan(countBeforeAdding);

    }

    sortByCheapest = async () => {
        this.sortDropDown.waitFor();
        this.productsTitle.first().waitFor();

        const titlesBeforeSorting = await this.productsTitle.allInnerTexts();
        await this.sortDropDown.selectOption("price-asc");
        const titlesAfterSorting = await this.productsTitle.allInnerTexts();
        expect(titlesAfterSorting).not.toEqual(titlesBeforeSorting);


    }

    }
