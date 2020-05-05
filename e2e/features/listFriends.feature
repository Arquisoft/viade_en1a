Feature: Listing friends

Scenario: Listing friends of a logged user
  Given a logged in user
  When  trying to see friends
  Then  we can see the friends