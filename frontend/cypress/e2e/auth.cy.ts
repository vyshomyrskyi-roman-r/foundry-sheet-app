describe('Auth flow', () => {
  const random = Math.random().toString(36).substring(2, 8)
  const user = {
    username: `test${random}`,
    email: `test${random}@example.com`,
    password: 'Password1!',
  }

  it('реєструє нового користувача', () => {
    cy.visit('/register')
    cy.get('input[name=username]').type(user.username)
    cy.get('input[name=email]').type(user.email)
    cy.get('input[name=password]').type(user.password)
    cy.get('input[name=confirmPassword]').type(user.password)
    cy.contains('button', 'Register').click()

    // підтвердження успіху на сторінці
    cy.contains('Registration successful!').should('be.visible')
  })

  it('логіниться і бачить головну сторінку', () => {
    cy.get('input[name=usernameOrEmail]').type(user.username)
    cy.get('input[name=password]').type(user.password)
    cy.contains('button', 'Log in').click()

    // після успішного логіну повинно перейти на /
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
  })
})
