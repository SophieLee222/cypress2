describe('Pet shop tests', () => {
    let pets;
  
    before(() => {
  cy.fixture('pets').then(p => {
    pets = p;
  });
});


  it('Create a pet', () => {
    const pet = pets.pet1;
    cy.createPet(pet);
    cy.getPet(pet);
  });

  it('Update a pet', () => {
    const pet = pets.pet3;
    const newPetName = 'Cat';
    cy.createPet(pet);



    cy.request({
      url: 'https://petstore.swagger.io/v2/pet',
      method: 'PUT',
      body: pet,
    })
      .its('status')
      .should('eq', 200);

    pet.name = newPetName;  

    cy.request(`https://petstore.swagger.io/v2/pet/${pet.id}`)
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(newPetName);
      });
  });

  it('Delete a pet', () => {
    const pet = pets.pet2;
    cy.createPet(pet);

    cy.deletePet(pet.id);    
    
  });

});
