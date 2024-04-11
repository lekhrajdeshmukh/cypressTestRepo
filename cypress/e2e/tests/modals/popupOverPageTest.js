/// <reference types="cypress" />

import { onPopupOverPage } from "../../../support/page_objects/modals/popupOverPage"
import { navigateTo } from "../../../support/page_objects/navigation/navigationpage"

describe('popover position tests', ()=>{
    beforeEach('Open home page', ()=>{
        cy.openHomePage()
        navigateTo.popupModelPage()
    })

    it('Test to click on left popup button',()=>{
        onPopupOverPage.hoverOnLeftButton()
        onPopupOverPage.element.hoverMessage().should('be.visible')
    })
})