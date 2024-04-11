/// <reference types="cypress" />


import { onRegisterAuthPage } from "../../../support/page_objects/auth/registerAuthPage"
import { navigateTo } from "../../../support/page_objects/navigation/navigationpage"

describe('Perform test for auth lgoin page', () => {
    beforeEach('Navigate to home page', () => {
        cy.openHomePage()
        navigateTo.registerPage()
    })

    it('Register new user', () => {
        cy.fixture('user.json').then(data => {
            const { fullName, emailAddress, password } = data
            onRegisterAuthPage.registerNewUser(fullName, emailAddress, password)
            onRegisterAuthPage.element.homePageHeader().should('be.visible')
        })
    })

    
    it('Test to verify warning message',()=>{
      cy.fixture('user.json').then(data => {
        const {fullNameWarning, emailWarning, passwordWarning} = data
        onRegisterAuthPage.registerUserWithInvalidInput("1", "1", "1")
        onRegisterAuthPage.element.warningMessages().eq(0).should('contain', fullNameWarning)
        onRegisterAuthPage.element.warningMessages().eq(1).should('contain', emailWarning)
        onRegisterAuthPage.element.passwordWarningMessage().should('contain', passwordWarning)
      })  
    })
})