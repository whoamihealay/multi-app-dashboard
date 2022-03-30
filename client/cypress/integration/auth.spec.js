/// <reference types="cypress" />

const url = 'http://localhost:3000'

describe('Auth E2E', () => {
  it('Load Sign up page', () => {
    cy.visit(url + '/signup')
    // Check URL.
    cy.url().should('include', '/signup')

    cy.contains('button', 'Sign up')
  })
  it('Sign up as bob', () => {
    cy.visit(url + '/signup')

    // Fill out sign up form
    cy.get('input[name=username]').type('bob')
    cy.get('input[name=email]').type('bob@email.com')
    cy.get('input[name=password]').type('password')
    cy.get('input[name=confirmation]').type('password')

    // Sign up
    cy.contains('button', 'Sign up').click()
  })
  // it('Logout', () => {
  //   cy.contains('button', 'Logout').click()
  // })

  it('Load login page', () => {
    cy.visit(url + '/login')
    cy.contains('button', 'Login')
    // Check URL
    cy.url().should('include', '/login')
  })
  it('Login as Bob', () => {
    cy.visit(url + '/login')
    cy.get('input[name=username]').type('bob')
    cy.get('input[name=password]').type('password')

    cy.contains('button', 'Login').click()

    cy.contains('Dashboard')
  })
  it('Logout', () => {
    cy.contains('button', 'Logout').click()
  })
})
