describe('login', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173');
    cy.get('#show-register').click();
    cy.get('#register-username').type('test');
    cy.get('#register-email').type('test@test.fr')
    cy.get('#register-password').type('qwerty');
    cy.get('#register-btn').click();
    cy.wait(5000);
    cy.get('#login-email').type('test@test.fr');
    cy.get('#login-password').type('qwerty');
    cy.get('#login-form > .login-btn').click();

    cy.get('#score').contains('Score');
  })
})