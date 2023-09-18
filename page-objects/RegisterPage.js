

export class RegisterPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByPlaceholder('E-mail');
        this.passwordInput = page.getByPlaceholder('password');
        this.registerButton = page.getByRole('button', {name: 'Register'});
    }

    signUpAsANewUser = async(email, pwd) => {
        await this.emailInput.waitFor();
        await this.passwordInput.waitFor();
        await this.registerButton.waitFor();

        await this.emailInput.fill(email);
        await this.passwordInput.fill(pwd);

        await this.registerButton.click();
    }
}