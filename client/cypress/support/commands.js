/// <reference types="cypress" />

Cypress.Commands.add('signup', (username, email, password) => {
  cy.visit('http://localhost:3000/signup')

  cy.get('input[name=username]').type(username)
  cy.get('input[name=email]').type(email)
  cy.get('input[name=password]').type(password)
  cy.get('input[name=confirmation]').type(password)

  cy.contains('button', 'Sign up').click()
})

Cypress.Commands.add('login', (username, password) => {
  cy.visit('http://localhost:3000/login')
  cy.get('input[name=username]').type(username)
  cy.get('input[name=password]').type(password)

  cy.contains('button', 'Login').click()
})

Cypress.Commands.add('logout', () => {
  cy.contains('button', 'Logout').click()
})
