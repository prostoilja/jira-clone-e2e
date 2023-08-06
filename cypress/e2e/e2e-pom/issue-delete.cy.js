//import { it } from "faker/lib/locales";

describe('Add Issue Deletion Tests', () => {
});
beforeEach(() => {
    cy.visit('https://jira.ivorreic.com/project/board');
        cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', 1)
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .first()
          .click();
          cy.wait(2000);
      })
  //Assert, that issue detail view modal is visible.
   cy.get('[data-testid="modal:issue-details"]').should('be.visible');  
      });
  it('opening first issue from the board', () => {
  //Delete issue (click delete button and confirm deletion)
  cy.get('[data-testid="icon:trash"]').click();
  cy.contains('Delete issue').click();
  cy.wait(2000);
  //Assert, that deletion confirmation dialogue is not visible
  cy.get('[data-testid="modal:confirm"]').should('not.exist', { timeout: 10000, interval: 1000 });
  //Assert, that issue is deleted and not displayed on the Jira board anymore
  cy.wait(2000);
  cy.contains('This is an issue of type: Task.').should ('not.exist')
});
it(' test case for starting the deleting issue process, but cancelling this action', () => {
  cy.get('[data-testid="icon:trash"]').click();
  cy.contains('Cancel').click();
  cy.wait(10000);
  cy.get('[data-testid="modal:confirm"]').should('not.exist');
  cy.contains("Are you sure you want to delete this issue?").should('not.exist');
  cy.get('[data-testid="icon:close"]').first().click();
  cy.contains('This is an issue of type: Task.').should ('be.visible')
});
