/// <reference types="cypress" />

import { onFormLayoutPage } from "../../../support/page_objects/forms/formLayoutPage"
import { navigateTo } from "../../../support/page_objects/navigation/navigationpage"


describe(`Test for form layout page`, () => {

    beforeEach('Open home page', () => {
        cy.openHomePage()
        navigateTo.formLayoutPage()
    })

    it('Test to submit inline form', () => {
        onFormLayoutPage.submitInlineForm('John cena', 'jj@test.com')
    })

    it('Test to submit signin form', () => {
        onFormLayoutPage.signInForm('jj@test.com', '123456')
    })

    it('Test to submit basic form', () => {
        onFormLayoutPage.basicForm('jj@test.com', '123456')
    })

    it('Test to submit form without labels', () => {
        onFormLayoutPage.formWithoutLabels('jj@test.com', 'jj1@test.com', "test message")
    })

})