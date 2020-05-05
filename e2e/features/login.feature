Feature: Log in

Scenario: User log in
  Given a user trying to log in
  When  introducing the url
  And   introducing the data
  Then we are logged in and welcome is shown