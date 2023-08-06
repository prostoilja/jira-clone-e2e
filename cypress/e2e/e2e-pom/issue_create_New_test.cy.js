import faker from 'faker';
describe('Issue create', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      cy.visit(url + '/board?modal-issue-create=true');
      });
    });
  

    it.only('Should create an issue and validate it successfully', () => {
        cy.get('[data-testid="modal:issue-create"]').within(() => {
          cy.get('.ql-editor').type('My bug description');
          cy.get('[data-testid="select:type"]').click();
          cy.contains('[data-testid="select-option:Bug"]', 'Bug').should('be.visible').click();
          cy.get('[data-testid="select:priority"]').click();
          cy.contains('Highest').click();
          cy.get('input[name="title"]').type('Bug');
          cy.get('[data-testid="select:userIds"]').click();
          cy.get('[data-testid="select:reporterId"]').click();
          cy.contains('Pickle Rick').click();
          cy.get('button[type="submit"]').click();
        });
        cy.get('[data-testid="modal:issue-create"]').should('not.exist');
        cy.contains('Issue has been successfully created.').should('be.visible');
        cy.reload();
        cy.contains('Issue has been successfully created.').should('not.exist');
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
          cy.get('[data-testid="list-issue"]')
              .should('have.length', '5')
              .first()
              .find('p')
              .contains('Bug');
          cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
          cy.get('[data-testid="icon:story"]').should('be.visible');
        });
      });
  
  
    it('Should validate title is required field if missing', () => {
      //System finds modal for creating issue and does next steps inside of it
      cy.get('[data-testid="modal:issue-create"]').within(() => {
        //Try to click create issue button without filling any data
        cy.get('button[type="submit"]').click();
  
        //Assert that correct error message is visible
        cy.get('[data-testid="form-field:title"]').should('contain', 'This field is required');
      });
    });
    
    it('Should create an issue and validate it successfully with random values', () => {
      let randomTitle;
        cy.get('[data-testid="modal:issue-create"]').within(() => {
          randomTitle = faker.random.word();   /////
          const randomBugDescription = faker.lorem.sentence();
          cy.get('.ql-editor').type(randomBugDescription);
          cy.get('[data-testid="select:type"]').click();
          //cy.contains('[data-testid="select-option:Bug"]', 'Bug').should('be.visible').click();
          cy.get('[data-testid="select:priority"]').click();
          cy.contains('Low').click();
          cy.get('input[name="title"]').type(randomTitle);
          cy.get('[data-testid="select:userIds"]').click();
          cy.get('[data-testid="select:reporterId"]').click();
          cy.contains('Baby Yoda').click();
          cy.get('button[type="submit"]').click();
        });
        cy.get('[data-testid="modal:issue-create"]').should('not.exist');
        cy.contains('Issue has been successfully created.').should('be.visible');
        cy.reload();
        cy.contains('Issue has been successfully created.').should('not.exist');
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
          cy.get('[data-testid="list-issue"]')
              .should('have.length', '5')
              .first()
              .find('p')
              .contains(randomTitle);
          cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
          cy.get('[data-testid="icon:story"]').should('be.visible');
        });
      });
  
  });
  