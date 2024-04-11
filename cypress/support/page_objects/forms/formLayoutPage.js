/// <reference types="cypress"/>

export class FormLayoutPage {

    submitInlineForm(userName, email) {
        cy.get('.form-inline [placeholder="Jane Doe"]').type(userName)
        cy.get('.form-inline [placeholder="Email"]').type(email)
        cy.get('.form-inline [type="submit"]').click()
    }

    signInForm(username, password) {
        cy.get('#inputEmail1').type(username)
        cy.get('#inputPassword2').type(password)
        cy.get('span.inner-circle').eq(0).click()
        cy.get(`div>[type='submit']`).eq(0).click()
    }
    basicForm(username, password) {
        cy.get('#exampleInputEmail1').type(username)
        cy.get('#exampleInputPassword1').type(password)
        cy.get('form>div>nb-checkbox>label>span.custom-checkbox').click()
        cy.get('.appearance-filled.size-medium.status-danger').click()
    }

    formWithoutLabels(recipients, subject, message) {
        cy.get(`[placeholder='Recipients']`).type(recipients)
        cy.get(`[placeholder='Subject']`).type(subject)
        cy.get(`[placeholder='Message']`).type(message)
        cy.get(`[status='success']`).click()
    }
}

export const onFormLayoutPage = new FormLayoutPage()