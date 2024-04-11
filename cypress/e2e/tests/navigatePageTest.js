/// <reference types="cypress"/>

import { navigateTo } from "../../support/page_objects/navigation/navigationpage"



describe(`Test to navigate to all sub-menus`, () => {

    beforeEach(`open application`, ()=> {
        cy.openHomePage()
    })

    it(`Navigate to main and sub-menus`, () => {
        navigateTo.formLayoutPage()
        navigateTo.datePickerPage()
        navigateTo.dialogModelPage()
        navigateTo.windowModelPage()
        navigateTo.popupModelPage()
        navigateTo.toasterModelPage()
        navigateTo.tooltipModelPage()
        navigateTo.calanderPage()
        navigateTo.smartTablePage()
        navigateTo.treeGridPage()
        navigateTo.loginAuthPage()
        navigateTo.registerAuthPage()
        navigateTo.requestPasswordPage()
        navigateTo.resetPasswordPage()
    })

})