// list of Cypress commands
Cypress.Commands.add('holderNumber', () => {
    return cy.get('[placeholder="Number"]');
  });
  Cypress.Commands.add('iconClose', () => {
    return cy.get('[data-testid="icon:close"]');
  });
  Cypress.Commands.add('listIssue', () => {
    return cy.get('[data-testid="list-issue"]');
  });
  Cypress.Commands.add('modalIssue', () => {
    return cy.get('[data-testid="modal:issue-details"]');
  });
  Cypress.Commands.add('stopWatch', () => {
    return cy.get('[data-testid="icon:stopwatch"]');
  });
  Cypress.Commands.add('modalTracking', () => {
    return cy.get('[data-testid="modal:tracking"]')
  });
  Cypress.Commands.add('reOpen', () => {
    cy.listIssue().eq(0).scrollIntoView().click({ force: true });
  });
  
  describe('Time tracking functionality', () => {
    let taskTitle; 
    beforeEach(() => {
      // Log in and visit the project board
     // cy.login();
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
    it('Time estimation functionality', () => {
      // Open the created task
      const taskTitle = 'NEW_TASK_TITLE';
      cy.listIssue().contains(taskTitle, { timeout: 15000 }).click({ force: true });
      cy.wait(5000);
      // (“No Time Logged” label is visible)
      cy.modalIssue().should('be.visible').contains('No time logged');
  
      // User adds value 10 to “Original estimate (hours)” field
      const newValue = '10';
      cy.holderNumber().clear().type(newValue);
      cy.holderNumber().should('have.value', newValue).should('be.visible');
      
      // User closes issue detail page
      cy.iconClose().first().click();
      cy.wait(1000);
      
      // User reopens the same issue to check that original estimation is saved
      cy.listIssue().eq(0).scrollIntoView().click({ force: true });
      cy.modalIssue().should('be.visible').contains('No time logged');
      cy.holderNumber().should('have.value', newValue);
  
      // User changes value in the field “Original estimate (hours)” from previous value to 20
      cy.listIssue().eq(0).scrollIntoView().click({ force: true });
      const newValueEd = '20';
      cy.holderNumber().clear().type(newValueEd);
      cy.holderNumber().should('have.value', newValueEd).should('be.visible');
      // User closes issue detail page
      cy.iconClose().first().click();
      cy.wait(1000);
      
      // User reopens the same issue to check that original estimation is saved
      cy.listIssue().eq(0).scrollIntoView().click({ force: true });
      cy.modalIssue().should('be.visible').contains('No time logged');
      cy.holderNumber().should('have.value', newValueEd);
  
      // User removes value from the field “Original estimate (hours)”
      cy.holderNumber().clear();
      // User closes issue detail page
      cy.iconClose().first().click();
      cy.wait(1000);
      // User reopens the same issue to check that original estimation is saved
      cy.listIssue().eq(0).scrollIntoView().click({ force: true });
      cy.modalIssue().should('be.visible').contains('No time logged');
      cy.holderNumber().should('have.value', '');
  
      // User clicks on time tracking section
      cy.stopWatch().click();
      // Check that time tracking pop-up dialogue is opened
      cy.modalTracking().should('be.visible');
  
      // User enters value 2 to the field “Time spent”
      cy.holderNumber().eq(1).click().type('2');
      // User enters value 5 to the field “Time remaining”
      cy.holderNumber().eq(2).click().type('5');
      // User click button “Done”
      cy.contains('button', 'Done').click(); 
      cy.wait(1000); 
      cy.modalIssue().should('be.visible'); //modal issue open
      // Spent time number is visible in the time tracking section
      cy.modalIssue().should('be.visible').contains('2h logged', { timeout: 10000 });
      cy.modalIssue().should('be.visible').contains('5h remaining', { timeout: 10000 });

      // “No Time Logged” label is no longer visible
      cy.modalIssue().contains('No time logged', { timeout: 15000 }).should('not.exist');
      // User click on time tracking section
      cy.stopWatch().click();
      // Check that time tracking pop-up dialogue is opened
      cy.modalTracking().should('be.visible');
      // User removes value from the field “Time spent”
      cy.holderNumber().eq(1).clear();
      cy.holderNumber().eq(1).should('have.value', '');
      // User removes value from the field “Time remaining”
      cy.holderNumber().eq(2).clear();
      cy.holderNumber().eq(2).should('have.value', '');

      // User click button “Done”
      cy.contains('button', 'Done').click();
      // Modal is presented
      cy.modalIssue().should('be.visible');
      //close modal
      cy.iconClose().first().click();
      cy.wait(10000);
      cy.get('[data-testid="board-list:backlog"]').should('be.visible');

    });
  });
  
  