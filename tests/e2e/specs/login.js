// https://docs.cypress.io/api/introduction/api.html

describe('Login test', () => {
  it('should visit', () => {
    cy.visit('http://localhost:8080/login')
    cy.get('#username').type('zoox')
    cy.get('#password').type('zoox')
    cy.get('#login').click()
    cy.location().should(loc => {
      expect(loc.pathname).to.equal('/dashboard')
    })
  })

  it('should have login error', () => {
    cy.visit('http://localhost:8080/login')
    cy.get('#username').type('admin')
    cy.get('#password').type('admin')
    cy.get('#login').click()
    cy.location().should(() => {
      cy.get('.v-messages__message').contains('Usuário ou senha inválidos')
    })
  })
})
