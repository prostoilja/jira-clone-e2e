describe('time tracking functionality ', () => {
    let numHolder;

    beforeEach(() => {
        cy.visit('/');
        cy.wait(1000);
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
            cy.wait(1000);
        });
    });
    it('Update estimation', () => {
        const newValueEd = '20';
                numHolder = cy.get('[placeholder="Number"]');
    cy.wait(1000);
    numHolder.clear().type(newValueEd);
    numHolder.should('have.value', newValueEd);
//assert that updated value is visible
    numHolder.should('have.value', newValueEd).should('be.visible');
//User closes issue detail page
    cy.get('[data-testid="icon:close"]').first().click();
    //User reopens the same issue to check that original estimation is saved
    cy.contains('This is an issue of type: Task.').click();
    cy.wait(1000);
//bug
//User removes estimation, that was previously added to issue
    cy.get('[placeholder="Number"]').clear();
    cy.get('[placeholder="Number"]').type('{selectall}{del}');
    cy.get('[data-testid="icon:close"]').first().click();
    //User reopens the same issue to check that original estimation is saved
    cy.contains('This is an issue of type: Task.').click();
    cy.wait(1000);
   // cy.get('[placeholder="Number"]').should('have.value', '').should('be.visible');
    //bug

});
it('add new estimation value time tracking modal', () => {
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"] input[placeholder="Number"]').eq(0).clear().type('20');
    cy.get('[data-testid="modal:tracking"] button').click();
});
});

