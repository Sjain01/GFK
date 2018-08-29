
let emailInput = 'identifier' ;
let clickOnEmailNext = 'identifierNext' ;
let pwdInput = '//*[@id="password"]/div[1]/div/div[1]/input' ;
let clickOnPwdNext = 'passwordNext';
let emailSubject = 'Test Email Subject' ;
let profileLogo = '//*[@id="gb"]/div[2]/div[3]/div/div[2]/div/a/span';
let compose = '//div[@class="z0"]/div';
let recipient = '//textarea[@name="to"]';
let subjectBox = 'subjectbox';
let messageBody = '//div[@aria-label="Message Body"]';
let sendButton = '//div[@data-tooltip="Send ‪(Ctrl-Enter)‬"]';
let logout ='a[href*="Logout"]';
let useAnotherAccount = '//*[@id="identifierLink"]/div[2]/p';
let profileIdentifier = '//*[@id="profileIdentifier"]';
let emailThreads = '//tr[@class="zA zE"]';
let emailThreadsSent = '//tr[@class="zA yO"]';

module.exports = {

    url: 'https://www.gmail.com',
    
    enterEmailAndPassword: function (email , password) {
        //Enter Username
        driver.findElement(by.name(emailInput)).sendKeys(email);
        driver.findElement(by.id(clickOnEmailNext)).click();
        driver.sleep(3000);
    
        driver.findElement(by.xpath(pwdInput)).sendKeys(password);
        driver.findElement(by.id(clickOnPwdNext)).click();

    },

    verifySuccessfulSignIn: function () {

        driver.wait(until.elementLocated(by.xpath(profileLogo)),20000)
        .then(() => {
            return driver.findElement(by.xpath(profileLogo));
        }).then((element)=>{
            // Log a message
            return console.log('Signed in verified successfully');
        }).catch(()=>{
            console.log('Element not found');
        })
    },

    composeEmail: function () {

            //Click on Compose
            driver.findElement(By.xpath(compose)).click();

            //compose a mail
            driver.findElement(by.xpath(recipient)).click();
            driver.findElement(by.xpath(recipient)).sendKeys(shared.testData.username2);
            driver.findElement(by.name(subjectBox)).sendKeys(emailSubject);
            driver.findElement(by.xpath(messageBody)).click();
            driver.findElement(by.xpath(messageBody)).sendKeys('This is an auto-generated email');
        
            //Click on send button
            driver.findElement(by.xpath(sendButton)).click();
            
    },

    verifyEmailSentSuccessfully: function () {

        driver.sleep(3000);
        driver.findElement(by.partialLinkText("Sent")).click();

        //Verify if email has been sent by searching and clicking on sent email
        driver.findElements(By.xpath(emailThreadsSent)).then(function(elements)
        {
            elements.forEach(function (element) 
            {
                element.getText().then(function(text)
                {
                    if (text.includes(emailSubject))
                    {
                        element.click();
                        driver.sleep(5000);
                    }
                })    
            })
         })  

        driver.sleep(2000); 
        //Logout from an account
        driver.findElement(by.xpath(profileLogo)).click();
        driver.findElement(by.css(logout)).click();       
    },
         
    verifyEmailReceivedSuccessfully: function () { 

        //Click on Account
        driver.findElement(by.xpath(profileIdentifier)).click();
        driver.sleep(2000);
        driver.findElement(by.xpath(useAnotherAccount)).click();
        driver.sleep(2000);

        //login to another account 
        page.gmailLogin.enterEmailAndPassword(shared.testData.username2 , shared.testData.password2);
        page.gmailLogin.verifySuccessfulSignIn();
        driver.sleep(2000);

        //Search and verify if email has been received using emailSubject
        driver.findElements(By.xpath(emailThreads)).then(function(elements)
        {
            elements.forEach(function (element) 
            {
                element.getText().then(function(text)
                {
                    if ((text.includes(emailSubject)) && (text.includes('This is an auto-generated email')))
                    {   
                        element.click();
                        driver.sleep(3000);
                    }            
                })    
            })
         })
        }    
};