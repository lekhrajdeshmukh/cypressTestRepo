# Install cypress

    - Prerequisite:
        - Node.js
        - npm or yarn : Those are Node.js package manager, npm is included with the installation of Node.js.
        - For Ubuntu following needs to be installed:
            - apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb

```console
- Command to update existing npm installation
    - npm install -g npm@latest
    - g stands for global installation of npm 

- Command to update nodejs
    - sudo apt install nodejs

```

```console
**If above installation command doesn't work then we can do this using nvm(Node version manager)**
- First, install nvm if you haven't already:
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

- Close and reopen your terminal, or run the following command to start using nvm in the current session
    source ~/.bashrc

- Then, use nvm to install the latest LTS version of Node.js:
    nvm install --lts

- To use the newly installed version:
    - nvm use --lts
```

**Note:** I was facing permission issue with respect to access to cache directory of cypress. error: "npm ERR! Cypress cannot write to the cache directory due to file permissions"

- Below steps help to install the cypress again:
  - sudo chown -R $(whoami) ~/.npm
  - npx cypress install

**- Command to clear cypress cache:**
    - npx cypress cache clear

**Steps to create cypress project**
    - Initialize a new Node.js project
        - npm init -y
    - Install cypress
        - npm install --save-dev cypress

    - Once the installation is complete, you can open Cypress to setup the project structure and configuration.
        - npx cypress open
**Good to know**

    -**npm** : It stands for `Node package manager`
        - It is primarily used for installing and managing Node.js package and dependencies.
        - It is a package manager that helps you download and manage package that your project depends on.
        - It also allow you to specify and manage project dependencies in the `package.json` file
        - Common commands includes:
            - `npm install` : To install dependencies
            - `npm init` : To initialize a new project
            - `npm run` : To execute scripts defined in your package.json file
    - **npx** : It stands for `Node package execute`
        - `npx` is a tool that comes with npm(version 5.2.0 and higher) and is used to execute Node.js package
        - It allows you to run binaries from locally installed packages or execute a package without the need for a global install.
        - One common use case is to run a package that you don't want to install gloablly.
        - Example: You can use `npx create-react-app my-app` to create a new React application without installing the `create-react-app` globally.
        - npx also helps with running binaries from packages that are not in the local `node_modules/.bin` directory.
    - In summary `npm` is primarily for package management, while `npx` is for executing packages. Both works together to facilitate the developlment and execution of Node.js projects.

**-Directory structures which cypress creates**

    - `fixtures` : Fixtures are a concept in testing that is used to assert the behaviour of a function.
        - Example: Our Web application should display an appropriate message when zero results are returned from the back end. In this case, the number of results can be a fixture.
        
    - `integration` : This is default home of our integration(end-to-end) test specs. Cypress discover and run the test inside the integration folder. It is convenient to group tests by common characteristics.
        - Example: Login screen specs can be created in the integration/login/directory.
        
    - `plugins` : Cypress is an extendable framework. It provides an API for adding more functionality on it. There are dozen of open source plugins available out there.
        - For example, there is a plugin that extends Cypress to Run tests on multiple URLs at various viewport sizes or a plugin that provides Simple command that make it easy to target abd fill in Stripe Elements input fields.
    
    - `support` : There are two files inside. The command.js and index.js. `Command.js` file allows you to define custom commands that can be used across your Cypress tests. Custom commands can help make your test code mode modular and readable by encapsulating repetitive or commonly used actions. The `index.js` file is loaded automatically before our test files are run. Usually we include the `command.js` file in `index.js`

**-Cypress Core Concepts**

    - `Closures` : A closure is the combination of a function bundled together (enclosed) with references to its surrounding state(the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function.
    
    - `Chainable` : In Cypress, we can chain multiple commands together so the result of the first command would be available for the second command. A command whose output can be used as input to another command is called **Chainable**. In addition each command output can be handled using the Promises **then()** method
        - `Example`:
            - cy.get("div.hl-popular-destinations-image-spacer").then($div => {  
                // get() is Promise
            // we could make assertion on div properties
            });
            - cy.get(".hl-popular-destinations-image-spacer")  // get() is Chainable
                .first()    // first() is Chainable
                .click()    // click() is Chainable
                .then(() => {
                    cy.get(".b-visualnav__grid > .b-visualnav__tile")
                .its("length")
                .should("equal", 5);
                })
    
    - `Variable and Aliases`: 
        - The concept of variable is unique to Cypress, in Cypress variables can be omitted in most cases.
        - `Closure` gurantee us access to yielded objects.
        - `Aliases` on other hand are part of Cypress API. We can use alises to perform a certain task or to get a specific resource without repeating the task over and over again.
        - To create a new alias, we would use the `as()` command. Every alias can be referred to by a prefix of `@`
        - Example:
            - Here we create an alias called firstCateogry using the following code:
                - it("first category alis", () => {
                    cy.visit("https://www.ebay.com");
                    cy.get("select#gh-cat > option").first().as("firstCategory"); **// The first option will have an alias of @firstCategory**
                    cy.get("@firstCategory").then(($option) => {
                        expect($option.text().toLowerCase()).equal("all categories");
                    });
                });
            - Similarly, we can create an alias for a request to the back end:
                describe("Uber Eats()", () => {
                    it("Specific restaurant page returns 200 and has a HTML content-type",() =>{
                        cy.request("https://www.ubereats.com/store/sliders-diner/V-WECNcvT86RbXMhlbyE-g").as("getStores");
                        cy.get("@"getStores").should((response) => {
                            expect(response.status).equal(200);
                            expect(response.headers["content-type"]).contains("text/html;");
                        });
                    });
                });
        - `cy` is a special object which exposes all the commands. Using `cy` we are instructing the underlying browsers to do the actions we want.
        - `Commands`:
            - Cypress comes with a dozen of built-in commands, as well as an API to create custom commands and extend Cypress functionalities. Once registered, the commands are called directly by the cy object.
            - Examples of widely used built-in commands:
                - **visit()** : Changes the address of the underlying browsers to a given URL.
                - **get()** : Return a DOM element by using either a selector or an alias.
                - **intercept()** : Allows performing actions when specific web requests are made. For example, our test can verify that a special POST request is made to the backend when a user fills a resgistration form.
            - Example of custom command:
                - cy.Commands.add('login', (username, password) => {
                    cy.visit('/login')
                    cy.get('#username').type(username)
                    cy.get('#password').type(password)
                    cy.get('button[type="submit"]').click()
                })
            - Now we have to include this `commands.js` file under the cypress configuration file i.e index.js
                - import './commands'
            - Use custom commands in your tests:
                - In your cypress test file, you can now use the custom commands you defined int the `commands.js` file.
                - Example:
                    describt('My Test Suite',()={
                        it('should login in', () =>{
                            cy.login('your_username', 'your_password')
                        })
                    })
    
    - `Network interception`:
            - Cypress is running a web browser, Cypress is able to sniff all traffic that goes to and from the `system under test`. This is very similar to network tab in Chrome DevTools, where we can observe the requests to the back-end by intercepting the requests, we are able to decide what to do when a specific request is made.
            - Example: 
                - It is pretty easy to assert that when a POST request to /login endpoint is made, it has username and password fields in the body.
                cy.intercept('POST', '/login').as('login');  // create an alias for POST request which to the */login* endpoint
                cy.visit('/login');                          // navigate to login page
                cy.wait('@login').                           // wait for /login operation to complete
                its('request').                              // access the request object
                should('have,own.property','username').      // Assertion #1: The request body should contain the "username" field, and
                and('have.own.property','password');         // Assertion #2: The request body should contain the "password" field.
    
    - `stubs`:
            - Stubs provide canned answers to calls made during the test, usually not responding not at all to anything outside what is programmed in for the test.
            - A stub is a core concept in testing. By stubbing an object, we can represent a state in the system in order to observe the behaviour of our system in a predicted manner.
            - The creation of stub is done using JSON fixture. The fixture wouls be saved to fixtures/<fileName.json>
            - Stubs work great with network intercepts and we are able to replace the response of api with the previous fixture by calling the following command:
                - cy.intercept("/login", {fixture: "user.json"})
            - Another way to use stub in Cypress is by stubbing functions and using the stub()  command.
            - Example:
                const myShape = new Shape(2, 3);
                cy.stub(myShape, "area").returns(30);  
            - In the testing literature, stubs are often called fakes.
            - Example: In the context of database testing, a stub might be used to simulate a database connection and return predefined data without actually querying a real database.
    
    - `Mocks`:
            - Mocks are objects pre-programmed with expectations which form a specification of the calls they are expected to receive.
            - The main difference between stubs and mocks is, Stubs are used for particular testing of the system given specific objects, mocks are used to represent a predictable result(behaviour) of a bigger part of the business logic.
            - `stubs`: How can we verify logic independently when it depends on indirect inputs from other software components? We replace a real object with a test-specific object that feeds the desired indirect inputs into the SUT.
            - `mocks`: How do we implement behaviour verification for indirect outputs of the SUT? Replace an object the SUT depends on with a terst-specific object that verifies it is being used correctly by SUT.
            - The rule of thumb is: When we want to test the state of the system we will use stub. When we want to test the behaviour of the system, we will use mocks.
            - In Cypress, we are able to mock a back-end response using intercept() command.
            - Example: In the case of testing a service that relies on an external API, a mock could be used to simulate the API responses and then verify that the service makes the expected API calls during the test.
    
    - `waiting`:
            - Cypress provides a special wait() command. It can be used in two cases:
                1. To explicitly wait an amount of time before proceeding to the next command.
                2. To wait for an aliased resource(s) to resolve before proceeding.
            - Examples:
                - wait 1 second between navigations:
                    - cy.visit('/products')
                      cy.wait(1000)
                      cy.visit('/about')
                - wait for a resource to resolve (using mock data)
                    cy.intercept("/products", [
                    { name: "iPhone 6", price: 150 },
                    { name: "iPad", price: 99 }
                    ]).as("getProducts");
                    cy.visit("/products");
                    cy.wait("@getProducts");
    
    - `spies`:
            - Spies, mocks and stubs are easy to get confused with each other.
            - stub:
                - A fake object which helps you to verify that the system performs as expected given the object. 
            - Mock:
                - A fake data that helps to verify that the system behaves as it should give the data.
            - spy:
                - In contrast to stub and mock, the spy does not prevent a function from doing its logic. Instead spy let us verify that a function was called.
    
    - `Test Runner`:
            - Cypress GUI is called the test runner. It is minimialistic and provides the most important features for managing and running tests.
            - To open the test runner, run below command inside a cypress project:
                - npx cypress open
    
    - `Command line` :
            - Cypress can be operated in two modes:
                - GUI: using test runner
                - In headeless mode: This mode is intended for CI/CD processes, where Cypress is used as the test runner of the integration tests as part of the testing phase.
                    - To run the test in headless mode:
                        - npx cypress run [options]
            - On some occassions, we will prefer to run a specific test spec. For that Cypress provides the --spec argument:
                - npx cypress run --spec ./cypress/integration/<path-to-spec.js>
            - When test fail in headless mode, by default, Cypress will do two things for us:
                1. It will capture a screenshot of whole browser so we can get an idea of what went wrong.
                2. Cypress will record a video of the test run from the beginning until the end. This way we might be able to spot the problem and solve it quickly.
            - Run cypress test with sepcific browser:
                - `npx cypress run --browser chrome`

**- Cypress vs Selenium WebDriver**

    - Selenium WebDriver
        - Selenium WebDriver is a framework for testing web applications by communicating with supported browsers using a driver.
        - As per selenium website: Selenium automates browsers. That's it.
        - Webdriver is a `remote-control-interface` that enables introspection and control of user-agents. It provides a platform and language-neutral wire protocol as a way for out of process programs to remotely instruct the behaviour of web browsers.
        - It provides a set of interface to discover and manipulate DOM elements in web documents and to control the behaviour of user-agent.
        - It is primarily intended to allow web authors to write tests that automate a user agent from a separate controlling process but may also be used in such a way as to allow in-browsers scripts to control a possibly separate browser.
    - Selenium Grid:
        - The Grid allows parallel testing across multiple machines.
        - Using selenuimGrid we can test our application on different browsers, versions and operating systems. 

**- Environment variables in cypress**

    - There are multiple ways to declare or pass the environment variable using cypress
    - We can declare environment variable under cypress config file i.e. cypress.config.js
                ```
                env:{
                username: 'test@test.com',
                password: 'Test$1234'
                }
                ```
        - To refer above environment variable under cypress test we can use Cypress.env('<environmentName>')
        - Example: Cypress.env('username')
    - You can also define environment specific environment variable
        - This you can define under package.json file
        - "cy:dev": "npx cypress open --env username=dev@test.com,password=password#123"
        - "cy:test": "npx cypress open --env username=test@test.com,password=password#123"
        - When you  run cy:dev then it will take developement specific environment ans same goes for cy:test, it will test specific defined environment variable.
    - You can also define environment variable under cypress.config.js which takes value from command line
        - e2e: ```
                {
                setupNodeEvents(on, config){
                const username = process.env.USER_NAME,
                const password = process.env.PASSWORD
                }
                if(!password){
                throw new Error('missing password environment variable')
                }
                config.env {username, password}
                return config 
                ```
        - Pass the value for environment variable from command line
            USERNAME="test@test.com" PASSWORD="Test@1234" npx cypress run

**Test Retries**

    - Sometimes some tests are flaky due to some feature takes different time to load it on page.
    - If you want test to be reRun again in case of failure then same can be defined under cypress config file
    - Example:
        - retires: 2

    - Also if you want to perform rerun only while running on pipeline/headless mode but not while running through testRunner then you can set below setting under cypress config file.
    - Example:
        - retries: {runMode: 2, openMode: 0}

    - Also, retires setting can be defiend at test level specific.
    - If you want retries should be done for a specific test then same can be defiend as follows:
    - Example:
        - it('Verify user can log out successfully', {retries: 2}, () => {   })
    - This setting will override the setting from cypress config file

**Reporter**

    - For reporting, you need to install additional dependencies including Mocha itself:
        - npm install --save-dev mocha cypress-multi-reporters mocha-junit-reporter
        - npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
        - npm install -save-dev junit-merge
    - After installation of above package, you need to define below setting under cypress config file:
        - 
        "reporter": "cypress-multi-reporters",
        "reporterOptions": {
            "configFile": "reporter-config.json"
        }
    - You need to create file named "reporter-config.json" under the current test repo folder.
    - After creation of file, you can enter below details:
        - {
            "reporterEnabled": "spec, mocha-junit-reporter",
            "mochaJunitReporterReporterOptions" : {
                "mochaFile": "cypress/results/results-[hash].xml"
            }
        }
    - Each spec file will generate the separate junit result file
    - It is also good practice to delete the test result before generating the new result.
    - This can be defined under scripts section of package.json file:
    - {
            "delete:reports": "rm -r cypress/results/* || true",
            "prereport": "npm run delete:reports"
       }
    - You can configure below setting for mochawesome report under reporter-config json file
        - "reporterOptions" : {
            "reportDir" : "cypress/results/mocawesome",
            "overwrite": false,
            "html":false,
            "json": true
        }
        - You need to also append text "mochawesome" into reporter config json file as:
            - "reporterEnabled": "mocha-junit-reporter, mochawesome"
        - After running the testsuite, you need the merge the result file and generate the html file using below command:
            - npx mochawesome-merge \"cypress/results/mochawesome/*.json\" > mochawesome.json && npx marge --reportDir TestReport mochawesome.json
            - above command you can also define under package.json file and this will create folder named TestReport which contains the html file named "mochawesome.html"

**Cypress with Docker**

    - Pre-requisities:
        - For this we need to first have the docker installed on our system and it is prefrred to have installed under non-root user
        - You can get the cypress docker base image from "https://github.com/cypress-io/cypress-docker-images"
    - You also want your application should be deployed and avaible for testing by cypress
        - To do this you need to install below package
            - npm install --save-dev start-server-and-test
        - This command is meant to be used with NPM script commands.
        - If you have a "start server", and "test" script names for example, you can start the server, wait for a url to respond, then run tests.
        - When the test process exits, then the server is shut down.
        - Example:
            "scripts": {
                "start-server": "npm-start",
                "test": "npm run cypress",
                "ci": "start-server-and-test start-server http://localhost:4200 test"
            }
        - In the current sample webApp it is using webpack-dev-server, so command would be like below:
            - start-server-and-test http-get://localhost:4200
    - Reference: "https://www.npmjs.com/package/start-server-and-test"
    - Just to remember that, all the scripts which are present under packag.json file will be executed using **npm run** command
    - Now you need to create the image using below command:
        - docker build -t <imageName> .
        - Example: docker build -t cypresstest .
    - 