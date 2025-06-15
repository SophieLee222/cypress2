// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => { 
    cy.get('[for="email"] > .login__input').type(email);
    cy.get('[for="pwd"] > .login__input').type(password);
    cy.get('.login__button').click();
 })


 Cypress.Commands.add('createPet', (pet) => {
  cy.request({
    url: 'https://petstore.swagger.io/v2/pet',
    method: 'POST',
    body: pet,
  }).its('status').should('eq', 200);
});

Cypress.Commands.add('getPet', (pet) => {
  cy.request(`https://petstore.swagger.io/v2/pet/${pet.id}`)
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(pet.id);
        expect(response.body.name).to.eq(pet.name);
      });
});

Cypress.Commands.add('updatePet', (pet) => {
  cy.request({
      url: 'https://petstore.swagger.io/v2/pet',
      method: 'PUT',
      body: pet,
    })
      .its('status')
      .should('eq', 200);

    pet.name = newPetName; 
});

Cypress.Commands.add('deletePet', (id) => {
  cy.request({
      url: `https://petstore.swagger.io/v2/pet/${id}`,
      method: 'DELETE'
    })
      .its('status')
      .should('eq', 200);
  });


