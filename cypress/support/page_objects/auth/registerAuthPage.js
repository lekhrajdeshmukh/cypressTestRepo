/// <reference types="cypress" />
class RegisterAuthPage {
    element = {
        registerLink: () => cy.get('.another-action>a'),
        fullName: () => cy.get('#input-name'),
        emailAddress: () => cy.get('#input-email'),
        password: () => cy.get('#input-password'),
        RePassword: () => cy.get('#input-re-password'),
        agreeCheckBox: () => cy.get('.custom-checkbox'),
        registerButton: () => cy.get('button'),
        homePageHeader: () => cy.get('ngx-header'),
        warningMessages: () => cy.get('p.caption.status-danger.ng-star-inserted'),
        passwordWarningMessage: () => cy.contains('div','Password').find('.caption.status-danger.ng-star-inserted')
    }
    registerNewUser(fullName, emailAddress, password) {
        this.element.fullName().type(fullName)
        this.element.emailAddress().type(emailAddress)
        this.element.password().type(password)
        this.element.RePassword().type(password)
        this.element.agreeCheckBox().click()
        this.element.registerButton().click()
    }

    registerUserWithInvalidInput(fullName, emailAddress, password) {
        this.element.fullName().type(fullName)
        this.element.emailAddress().type(emailAddress)
        this.element.password().type(password)
        this.element.RePassword().type(password)
    }
}
export const onRegisterAuthPage = new RegisterAuthPage()