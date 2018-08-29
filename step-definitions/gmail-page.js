
const {Builder, By, Key, until} = require('selenium-webdriver');

module.exports = function () {   

    this.Given(/^I navigate to "([^"]*)"$/, function (url) {
        // Navigate to Gmail
        return helpers.loadPage(page.gmailLogin.url);
    });

    this.Then(/^I enter username and password$/, function () {

        // enter username and password 
        page.gmailLogin.enterEmailAndPassword(shared.testData.username1 , shared.testData.password1);
    });
        
        
    this.Then(/^I verify if i have signed in correctly$/, function () {

        // check if inbox element is present on the page
        page.gmailLogin.verifySuccessfulSignIn();

    });

    this.Then(/^I compose an email$/, function () {
        // Componse a mail 
        page.gmailLogin.composeEmail();

    });

    this.Then(/^I verify email has been sent successfully$/,() => {
        page.gmailLogin.verifyEmailSentSuccessfully();

    });

    this.Then(/^I verify if email has been received$/, function () {

        // Verify an email
        page.gmailLogin.verifyEmailReceivedSuccessfully();
        

    })
    
};