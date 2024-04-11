/// <reference types="cypress"/>

export class DatePickerPage {
    elements = {
        datePicker: (day) => cy.get('.day-cell').not('.bounding-month').contains(day),
        fromPicker : () => cy.get(`[placeholder='Form Picker']`),
        rangePicker: () => cy.get(`[placeholder='Range Picker']`)
    }

    selectCommonDatePicker(day) {
        this.elements.fromPicker().click()
        this.elements.datePicker(day).click()
    }

    seletRangeDatePicker(day1, day2){
        this.elements.rangePicker().click()
        this.elements.datePicker(day1).click()
        this.elements.rangePicker().click()
        this.elements.datePicker(day2).click()
    }

}

export const onDatePickerPage = new DatePickerPage()