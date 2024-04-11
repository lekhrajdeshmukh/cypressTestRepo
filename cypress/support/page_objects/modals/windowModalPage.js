/// <reference types="cypress" />

import { onDialogModalPage } from "./dialogModalPage"



class WindowModalPage {
    elements = {
        subjectInput: () => cy.get('form>input'),
        texttInput: () => cy.get('form>textarea'),
        closeIcon: () => cy.get(`[icon='close-outline']`)
    }

    openWindowForm() {
        onDialogModalPage.elements.openDialogWithComponent('Open window form').click()
    }

    fillWindowFormFields(subject, text) {
        this.elements.subjectInput().type(subject)
        this.elements.texttInput().type(text)
    }

    closePopupWindow(){
        this.elements.closeIcon().click()
    }
}

export const onWindowModalPage = new WindowModalPage()