//const it = require("faker/lib/locales/it");

  Cypress.Commands.add('holderNumber', () => {return cy.get('[placeholder="Number"]');});
  Cypress.Commands.add('iconClose', () => {return cy.get('[data-testid="icon:close"]');});
  Cypress.Commands.add('listIssue', () => {return cy.get('[data-testid="list-issue"]');});
  Cypress.Commands.add('modalIssue', () => {return cy.get('[data-testid="modal:issue-details"]'); });
  Cypress.Commands.add('stopWatch', () => {return cy.get('[data-testid="icon:stopwatch"]');});
  Cypress.Commands.add('modalTracking', () => {return cy.get('[data-testid="modal:tracking"]')});
  Cypress.Commands.add('reOpen', () => {cy.listIssue().eq(0).scrollIntoView().click({ force: true });
  Cypress.Commands.add('selectPriority', () => {return cy.get('[data-testid="select:priority"]');});
});

describe('Time tracking functionality', () => {
    let taskTitle;
    let priorityArray = [];
  
beforeEach(() => {
     // Log in and visit the project board
      cy.visit('https://jira.ivorreic.com/project/board/');
      cy.wait(1000);
  
      // Create a new task
      cy.get('[data-testid="icon:plus"]').first().click();
      cy.get('.ql-editor').type('TEST_DESCRIPTION');
      cy.get('input[name="title"]').should('be.visible').type('NEW_TASK_TITLE');
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.wait(1000);
      cy.get('button[type="submit"]').should('be.visible').click();
      cy.wait(30000);
  
      // Store the task title in a variable for future use
      taskTitle = 'NEW_TASK_TITLE';
    });
  
    it('test for checking dropdown “Priority” on issue detail page', () => {
      cy.get('[data-testid="list-issue"]').contains(taskTitle).click();
  
      const expectedLength = ['High', 'Highest', 'Medium', 'Low', 'Lowest'];
    // Perform tests using the array
      cy.wrap(expectedLength).should('have.length', 5);
      cy.wrap(expectedLength).should('include', 'Medium');
      cy.wrap(expectedLength).should('not.include', 'Unknown');

    // Test each item in the array
      cy.wrap(expectedLength).each((item) => {
        cy.log(`Current item: ${item}`);
  
        const priorityArray = [];
    // Get the selected priority and push it into the array
        cy.selectedPriority.invoke('text').then((selectedPriority) => {
          priorityArray.push(selectedPriority.trim());
          cy.log(`Priority Array: ${priorityArray}`);
  
    // Push into this array first element "Highest"
          priorityArray.unshift("Highest");
          cy.log(`Priority Array with "Highest": ${priorityArray}`);
  
    // Access the list of all priority options
          cy.celectPriority().should('exist').and('be.visible');
          cy.wait(5000);
          cy.selectedPriority().click();
  
    // Loop through the elements
          cy.get('[data-testid^="select-option:"]').each(($option) => {
            // Get the text value of the current option
            cy.wrap($option).invoke('text').then((text) => {
              // Push the text value into the priorityArray
              priorityArray.push(text.trim());
              cy.log('Added:', text.trim(), 'Array length:', priorityArray.length);
            });
          }).then(() => {
            cy.log('Final Priority Array:', priorityArray);
          });
        });
      });
    });
  it.only('Reporter name has only characters in it', () => {
      cy.listIssue().contains(taskTitle).click();
      cy.get('[data-testid="select:reporter"]').invoke('text').then(reporterName => {
        cy.log('Reporter Name:', reporterName);
        // Assert that the reporter name contains only characters and spaces using a regular expression
        expect(/^[A-Za-z\s]*$/.test(reporterName)).to.be.true;
      });
    });
    });
      
      