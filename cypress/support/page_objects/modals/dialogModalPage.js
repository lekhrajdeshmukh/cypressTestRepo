/// <reference types="cypress"/>

class DialogModalPage {
    elements = {
        openDialogWithComponent : (dialogName) => cy.contains('nb-card', dialogName).find('button').eq(0),
        isdialgBoxVisible : () => cy.get('ngx-showcase-dialog>nb-card>nb-card-header'),
        dismissDialogBox : () => cy.get('nb-card-footer>button')
    }

    openDialogWithComponent(){
        this.elements.openDialogWithComponent('Open Dialog').click()
    }

    dismissDialogBox(){
        this.elements.dismissDialogBox().click()
    }

}

export const onDialogModalPage = new DialogModalPage()