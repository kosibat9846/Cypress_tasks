class LoginPage {

    elements = {
        usernameInput: () => cy.get('input[name=UserName]'),
        passwordInput: () => cy.get('input[name=Password]'),
        loginButton: () => cy.get('button[id=login]'),
        loginStatus: () => cy.get('label[id=loginstatus]')
    }

    visit() {
        cy.visit('http://uitestingplayground.com/sampleapp')
    }

    typeUsername(username) {
        this.elements.usernameInput().type(username);
    }

    clearUsername() {
        this.elements.usernameInput().clear();
    }

    typePassword(password) {
        this.elements.passwordInput().type(password);
    }

    clearPassword() {
        this.elements.passwordInput().clear();
    }

    clickLogInButton() {
        this.elements.loginButton().click()
    }

    login(username, password) {
        this.typeUsername(username);
        this.typePassword(password);
        this.elements.loginButton().click();
    }

    clickLogOutButton() {
        this.elements.loginButton().contains("Log Out").click()
    }

    containsSuccessfulLoggedInStatus(username) {
        let expectedLoginStatusMessage = `Welcome, ${username}!`
        this.elements.loginStatus().contains(expectedLoginStatusMessage)
    }

    containsSuccessfulLoggedOutStatus() {
        this.elements.loginStatus().contains(`User logged out.`)
    }

    containsUnsuccessfulLoginStatus() {
        this.elements.loginStatus().contains('Invalid username/password')
    }

}

export default LoginPage;