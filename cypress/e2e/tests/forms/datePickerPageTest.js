/// <reference types="cypress"/>

import { onDatePickerPage } from "../../../support/page_objects/forms/datePickerPage"
import { navigateTo } from "../../../support/page_objects/navigation/navigationpage"

describe('datepciker page tests', ()=>{
    beforeEach('Open home page', ()=>{
        cy.openHomePage()
        navigateTo.datePickerPage()
    })

    it('select single date from datepicker option',()=>{
        const day = 19
        onDatePickerPage.selectCommonDatePicker(day)
        cy.getSelectedDate('Form Picker').as('value')
        cy.getFormattedDate(day).as('expectedDate')
        cy.get('@value').then(value =>{
            cy.get('@expectedDate').should('contain', value)
        })
    })

    it('select date range from datepicker range', ()=>{
        const day1 = 10
        const day2 = 20
        onDatePickerPage.seletRangeDatePicker(day1, day2)
    })
})