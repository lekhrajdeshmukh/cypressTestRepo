/// <reference types="cypress" />

import { onWindowModalPage } from "../../../support/page_objects/modals/windowModalPage"
import { navigateTo } from "../../../support/page_objects/navigation/navigationpage"

describe('Test for all types of window modals', () =>{
    beforeEach('OpenHomePage',()=>{
        cy.openHomePage()
        navigateTo.windowModelPage()
    })

    it('open window form', ()=>{
        onWindowModalPage.openWindowForm()
        onWindowModalPage.fillWindowFormFields('window form', 'sample text message')
        onWindowModalPage.closePopupWindow()
    })
})