/// <reference types="cypress" />

class PopupOverPage {
    element = {
        popupOptionButton : (buttonName) => cy.get(`button[nbpopoverplacement='${buttonName}']`),
        hoverMessage : () => cy.get('.primitive-overlay')
    }
    hoverOnLeftButton(){
        this.element.popupOptionButton('left').click()
        // this.element.popupOptionButton('left').trigger('mouseover')
    }
}
export const onPopupOverPage = new PopupOverPage()