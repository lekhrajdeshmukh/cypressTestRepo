/// <reference types="cypress"/>

function navigateToMainMenu(menuName) {
    cy.contains('a', menuName).then(menu => {
        cy.wrap(menu).find('.expand-state svg g g').invoke('attr', 'data-name').then(attr => {
            if (attr.includes('left')) {
                cy.wrap(menu).click()
            }
        })
    })
}

export class NavigationPage {
    element = {
        backButton : () => cy.get(`[data-name='arrow-back']`)
    }

    formLayoutPage() {
        navigateToMainMenu('Forms')
        cy.contains('Form Layouts').click()
    }

    datePickerPage(){
        navigateToMainMenu('Forms')
        cy.contains('Datepicker').click()
    }

    dialogModelPage(){
        navigateToMainMenu('Modal & Overlays')
        cy.contains('Dialog').click()
    }

    windowModelPage(){
        navigateToMainMenu('Modal & Overlays')
        cy.contains('Window').click()
    }

    popupModelPage(){
        navigateToMainMenu('Modal & Overlays')
        cy.contains('Popover').click()
    }

    toasterModelPage(){
        navigateToMainMenu('Modal & Overlays')
        cy.contains('Toastr').click()
    }

    tooltipModelPage(){
        navigateToMainMenu('Modal & Overlays')
        cy.contains('Tooltip').click()
    }

    calanderPage(){
        navigateToMainMenu('Extra Components')
        cy.contains('Calendar').click()
    }

    smartTablePage(){
        navigateToMainMenu('Tables & Data')
        cy.contains('Smart Table').click()
    }

    treeGridPage(){
        navigateToMainMenu('Tables & Data')
        cy.contains('Tree Grid').click()
    }

    loginAuthPage(){
        navigateToMainMenu('Auth')
        cy.contains('Login').click()
        this.element.backButton().click()

    }

    registerAuthPage(){
        navigateToMainMenu('Auth')
        cy.contains('Register').click()
        this.element.backButton().click()
    }

    registerPage(){
        navigateToMainMenu('Auth')
        cy.contains('Register').click()
    }

    requestPasswordPage(){
        navigateToMainMenu('Auth')
        cy.contains('Request Password').click()
        this.element.backButton().click()
    }

    resetPasswordPage(){
        navigateToMainMenu('Auth')
        cy.contains('Reset Password').click()
        this.element.backButton().click()
    }
}

export const navigateTo = new NavigationPage()