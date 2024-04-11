// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress"/>

Cypress.Commands.add('openHomePage', () => {
    cy.visit('/')
})

Cypress.Commands.add('getSelectedDate', (dateField) => {
    return cy.get(`[placeholder='${dateField}']`).invoke('prop', 'value')
})

Cypress.Commands.add('getFormattedDate', (dayOfMonth) => {
    let currentDate = new Date()
    currentDate.setDate(dayOfMonth)
    if (currentDate.getDate() < dayOfMonth) {
        currentDate.setMonth(currentDate.getMonth() + 1)
    }
    let options = { year: 'numeric', month: 'short', day: 'numeric' }
    let formaatedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate)
    return formaatedDate
})

