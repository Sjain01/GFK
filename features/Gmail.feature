Feature: Send and Receive a Gmail Email

   As an internet user I want to send and receieve Gmail email

   Scenario: Send a gmail email and verify if it has been received successfully
   Given I navigate to "Gmail.com"
   Then I enter username and password
   And I verify if i have signed in correctly
   And I compose an email 
   And I verify email has been sent successfully
   Then I verify if email has been received
