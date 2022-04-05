/// <reference types="cypress" />

const url = 'http://localhost:3000'

describe('Todos E2E', () => {
  it('Empty Todo list for new user', () => {
    cy.signup('jane', 'jane@email.com', 'password')

    cy.contains('List Empty')
  })

  it('Add three new todos', () => {
    cy.logout()
    cy.login('jane', 'password')

    cy.get('input[name=text]').type('first todo {enter}')
    cy.contains('first todo')
    cy.get('input[name=text]').type('second todo {enter}')
    cy.contains('second todo')
    cy.get('input[name=text]').type('third todo {enter}')
    cy.contains('third todo')
  })

  it('Delete all todos', () => {
    cy.logout()
    cy.login('jane', 'password')
    cy.get('button[name="delete"]').click({ multiple: true })
    cy.contains('List Empty')
  })
})
