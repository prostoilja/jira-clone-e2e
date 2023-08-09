describe('Bug', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
    });
  
    it('Should create an issue and validate it successfully', () => {
       cy.get('[data-testid="modal:issue-create"]').within(() => {
       
        cy.get('.ql-editor').type('My bug description');
        cy.get('input[name="title"]').type('Bug');

        cy.get('[data-testid="select:type"]').click();
        cy.contains('[data-testid="select-option:Bug"]', 'Bug').should('be.visible').click();
  
  
        cy.get('[data-testid="select:userIds"]').click();
        cy.contains('[data-testid="select-option:Pickle Rick"]', 'Pickle Rick').should('be.visible').click();

        
  
        cy.get('button[type="submit"]').click();
      });
  
      cy.get('[data-testid="modal:issue-create"]').should('not.exist');
      cy.contains('Issue has been successfully created.').should('be.visible');
  
      cy.reload();
      cy.contains('Issue has been successfully created.').should('not.exist');
  /*
      cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1').within(() => {
        cy.get('[data-testid="list-issue"]').should('have.length', '5').first().find('p').contains('TEST_TITLE');
        cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
        cy.get('[data-testid="icon:bug"]').should('be.visible');//
      });
      */
    });
  });
  