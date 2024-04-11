/// <reference types="cypress" />


import { onDialogModalPage } from "../../../support/page_objects/modals/dialogModalPage"
import { navigateTo } from "../../../support/page_objects/navigation/navigationpage"


describe('Dialog specific test', () => {
    beforeEach('Open home page', () => {
        cy.openHomePage()
        navigateTo.dialogModelPage()
    })

    it('Open dialog with component', () =>{
        onDialogModalPage.openDialogWithComponent()
        onDialogModalPage.elements.isdialgBoxVisible().should('be.visible')
        onDialogModalPage.dismissDialogBox()
    })
})

