import { test, expect } from '@playwright/test';
import { MyAccountPage } from '../page-objects/MyAccountPage';
import { getLoginToken } from '../api-calls/getLoginToken';
import { userDetails } from '../data/userDetails';

test("Testing my account page - Cookie injection", async({ page }) => {

    const loginToken = await getLoginToken(userDetails);
    const myAccountPage = new MyAccountPage(page);
    await myAccountPage.visit();
    await page.evaluate( ([DocumentToken]) => {
        document.cookie = `token=${DocumentToken}`;
        }, [loginToken]);
    await myAccountPage.visit();
    await myAccountPage.waitForHeading();
})

test("Testing my account page - Mocking Request", async({ page }) => {

    const loginToken = await getLoginToken(userDetails);

    await page.route('**/api/user**', async (route, request) => {
        await route.fulfill({
            status: 500, 
            contentType: 'application/json', 
            body: JSON.stringify({message: 'Playwright Mocking Request'})
        }); 

    })

    const myAccountPage = new MyAccountPage(page);
    await myAccountPage.visit();
    await page.evaluate( ([DocumentToken]) => {
        document.cookie = `token=${DocumentToken}`;
        }, [loginToken]);
    await myAccountPage.visit();
    await myAccountPage.waitForHeading();
})