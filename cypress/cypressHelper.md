**Difference between Cypress and Selenium**
- Cypress is a complete framework whereas selenium is an API and you need to decide what programming language you need to use write test script.Similary what testing framework you want to use for selnium is upto you like TestNg, Nunit, Junit etc.
- Cypress is way more faster than selenium. The reason behind that is is because Cypress using JavaScript and JavaScript is the only one native language for the web-browser. So when you run a cypress test it is executed inside of the browser without using the webdriver. So your test execution will be as fast as browser can actually render your web page and selenium with this comparision definitely not that fast as Cypress.
- Cypress test are more stable as your test is executed inside of the browser in the same runloop and it don't have a dependencies with the webdriver and browser compatibility.
- Cypress can test and mock APIs and selenium do not have capability. Mocking APIs in Cypress is a very power feature where you can configure what API response you are expecting from your backend. In can be useful to simulate some case scenarios like error message or something like that.
- Cypress doesn not support IE and Safari browser. Initally it supported only chrome and electron browser. Since release of 2020 it started supporting Mozilla, Firefox and Microsoft Edge browser which is on the chromium engine.
- Also cypress code is asynchronous 
- Cypress does not support testing on the mobile devices or on the mobile emulators. What you can do is to test just responsive design in the browser, but you cannot actually test on the mobile devices like you can do with selenium and Appium.
- Cypress only limited to run the test only for the single domain or for the single tab. For example, if you click on the link and browser open a new window and in selenium you can switch to this window and then made some operations over there in Cypress, you cannot do this. There is some workarounds when you can access the content of the new tab, but you will not be able to perform any actions on that tab.
- Cypress is not friendly with iFrames.

**Cypress COnfiguration**
- Please refer below url to get more information about cypress:
    https://docs.cypress.io/guides/references/configuration
- In this project mainly we are going to configure below setting:
    - url
    - video recording
    - spec pattern
    - viewportHeight
    - viewportWidth

**Cypress TestCases**
- Each test file in cypress should start with below line:
    - /// <reference types="cypress" />
    - `///` indicates a triple slash  directive in javascript
    - `<reference type="cypress">` specifies that the type definitions for Cypress should be included.
    - This specific reference directive is used to provide TypeScript with the definitions for Cypress commands and utilites. It helps the TypeScript compiler understand and validate the Cypress specific syntex and methods used in your test scripts, providing better code completion, type checking, and error detection during development.
    - By including this reference directive at the top of your TypeScript file, you are essentially telling the TypeScript compiler to include the type definitions for CYpress, ensuring that your code is well typed and aligned with Cypress API.
    - Each test file in cypress start with either `describe()` or `context()`
        - It basically considered as test suits which contains different test cases with respect to application.
    - One test file can have multiple `describe()` block and under `describe()` block we can have nested `describe()` block as well.
    - Nested describe block is useful in case we want to perform some beforeTest with respect to some set of test cases.
**Common Cypress methods**
    - get() : Find elements on the page by locator globally
        - example: cy.get(`#input`)
    - find() : Find child elemnts by locator
        - example: cy.get(`#input`).find(`[data-cy='test']`)
    - contains() : Find html text by text and locator
        - example: cy.contains(`#space`,'option').click()
    - cypress chain command:
        - cy.get(`#inputEmail`)
            .parents(`form`)
            .find(`button`)
            .should(`contain`,'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()
    - To handle uncaught exception of application, you can use below setting under cypress test:
        Cypress.on('uncaught:exception', (err, runnable) => {
        // handle the error or return false to ignore it
        return false;
        });
        - If there are specific errors that you want to ignore during a test, you can use Cypress commands to intercept and handle them. For example, you can use cy.on() to listen for uncaught exceptions and prevent Cypress from failing the test.
        - You can include this code in your test file or support file to customize error handling.
    - Cypress has two ways to save the reference of the command:
        - `using alias`
            - Example:
                cy.contains(`nb-card`, `Using the grid`).as(`usingTheGrid`)
                cy.get(`@usingTheGrid`).find(`[for='inputEMail1']`).should('contain', 'Email')
                cy.get(`@usingTheGrid`).find(`[for='inputEMail2']`).should('contain', 'Password')
        - `using then`
            - Example:
                cy.contains(`nb-card`,`Using the grid`).then(usingTheGrid =>{
                    cy.wrap(usingTheGridForm).find(`[for='inputEMail1']`).should('contain', 'Email')
                    cy.wrap(usingTheGridForm).find(`[for='inputEMail1']`).should('contain', 'Password')
                })
- **Tips:**
    - Sometimes, some elements are marked as hidden in html code and to intract with those element using cypress we need to pass ({force:true})
        - Example:
            - cy.get(`#submit`).click({force:true})