describe('login', () => {
  it('inscrit puis connecte un utilisateur', () => {
    cy.visit('http://localhost:5173');

    cy.get('#show-register').click();

    const email = `test+${Date.now()}@test.fr`;
    const password = 'qwerty';
    const username = 'test';

    cy.get('#register-username').type(username);
    cy.get('#register-email').type(email);
    cy.get('#register-password').type(password);
    cy.get('#register-btn').click();

    cy.wait(1000);

    // Connexion
    cy.get('#login-email').type(email);
    cy.get('#login-password').type(password);
    cy.get('#login-form > .login-btn').click();

    cy.get('#score').should('exist');

    cy.wait(1000);
    cy.get('.logout').click();
    cy.get('#login-container > h2').contains('Se connecter');
  });
});
