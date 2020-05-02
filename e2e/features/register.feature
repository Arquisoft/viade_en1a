Feature: Register

Scenario: Register already registered user
  Given An already registered user
  When  Choosing register
  And   Introducing the data
  Then  redirects to new user