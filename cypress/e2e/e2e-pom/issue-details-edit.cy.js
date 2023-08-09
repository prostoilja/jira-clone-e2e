// list of Cypress commands
Cypress.Commands.add('holderNumber', () => {
    return cy.get('[placeholder="Number"]');});
Cypress.Commands.add('iconClose', () => {
    return cy.get('[data-testid="icon:close"]');});
  Cypress.Commands.add('listIssue', () => {
    return cy.get('[data-testid="list-issue"]');});
  Cypress.Commands.add('modalIssue', () => {
    return cy.get('[data-testid="modal:issue-details"]');});
  Cypress.Commands.add('stopWatch', () => {
    return cy.get('[data-testid="icon:stopwatch"]');});
  Cypress.Commands.add('modalTracking', () => {
    return cy.get('[data-testid="modal:tracking"]')});
  Cypress.Commands.add('reOpen', () => {
    cy.listIssue().eq(0).scrollIntoView().click({ force: true });});
  
  describe('Time tracking functionality', () => {
    let taskTitle; 
    let EmptyArray = [];

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
    });
        // Store the task title in a variable for future use
        taskTitle = 'NEW_TASK_TITLE';
  
    it('test for checking dropdown “Priority” on issue detail page', () => {
  
      // Open the created task
      const taskTitle = 'NEW_TASK_TITLE';
      cy.listIssue().contains(taskTitle, { timeout: 15000 }).click({ force: true });
      cy.wait(5000);
      cy.get('[data-testid="select:priority"]').should('exist').and('be.visible');
      cy.wait(5000);

      //Predefine variable for “const expectedLength = 5”
      const expectedLength = ['High', 'Highest', 'Medium', 'Low', 'Lowest'];

      // Perform tests using the array
    cy.wrap(expectedLength).should('have.length', 5);
    cy.wrap(expectedLength).should('include', 'Medium');
    cy.wrap(expectedLength).should('not.include', 'Unknown');
  
      // Test each item in the array
    cy.wrap(expectedLength).each((item) => {
        // You can perform additional tests on each item in the array
    cy.log(`Current item: ${item}`);

       //Predefine empty array variable
       const priorityArray = [];
    // Get the selected priority and push it into the array
    cy.get('[data-testid="select:priority"]').invoke('text').then((selectedPriority) => {
    priorityArray.push(selectedPriority.trim());
    cy.log(`Priority Array: ${priorityArray}`);
    
    //Push into this array first elemen Highest
    priorityArray.unshift("Highest");
    cy.log(`Priority Array with "Highest": ${priorityArray}`);
    //Access the list of all priority options
    cy.get('[data-testid="select:priority"]').should('exist').and('be.visible');
    cy.wait(5000);
    cy.get('[data-testid="select:priority"]').click();
    
    //Loop through the elements
    cy.get('[data-testid^="select-option:"]').each(($option) => {
        // Get the text value of the current option
    cy.wrap($option).invoke('text').then((text) => {
          // Push the text value into the priorityArray
          priorityArray.push(text.trim());
        });
      }).then(() => {
        // Log the priorityArray after all elements have been processed
    cy.log('Priority Array:', priorityArray);
    //Assert that created array has the same length as your predefined number
    cy.wrap(priorityArray).should('have.length', expectedLength.length);


    });
    });
    });
    });
  });
