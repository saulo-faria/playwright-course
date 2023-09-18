import { test, expect } from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductsPage";
import { Navigation } from "./../page-objects/Navigation";
import { Checkout } from "../page-objects/Checkout";
import { LoginPage } from "../page-objects/LoginPage";
import { RegisterPage } from "../page-objects/RegisterPage";
import { v4 as uuidv4 } from 'uuid';
import { DeliveryDetails } from "../page-objects/DeliveryDetails";
import { deliveryDetails as userAddress } from "../data/deliveryDetails";
import { PaymentPage } from "../page-objects/PaymentPage";
import { paymentDetails } from "../data/paymentDetails";

test('New User Full End-to-End Test Journey', async({ page }) => {
    const productPage = new ProductsPage(page);
    await productPage.visit();
    

    await productPage.addProductsBasket(0);
    await productPage.addProductsBasket(1);
    await productPage.addProductsBasket(2);
    
    const navigation = new Navigation(page);
    await navigation.goToCheckout();

    const checkout = new Checkout(page);
    await checkout.removeCheapestProducts();

    //await productPage.sortByCheapest();
    await checkout.continueToCheckout();

    const loginPage = new LoginPage(page);
    await loginPage.continueToSignUp();

    const email = uuidv4() + '@email.com';
    const pwd = uuidv4();

    const registerPage = new RegisterPage(page);
    await registerPage.signUpAsANewUser(email, pwd);

    const deliveryDetails = new DeliveryDetails(page);
    await deliveryDetails.fillDetails(userAddress);
    await deliveryDetails.saveDetails();
    await deliveryDetails.continueToPayment();

    
    const paymentPage = new PaymentPage(page);
    await paymentPage.getDiscountCode();
    await paymentPage.fillPaymentDetails(paymentDetails);
    
})