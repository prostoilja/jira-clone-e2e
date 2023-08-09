/**
 * This is an example file and approach for POM in Cypress
 */
//import { it } from "faker/lib/locales";
import IssueModal from "../../pages/IssueModal";

describe('Time estimation functionality', () => {
 let numHolder;

  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //open isse creation modal  
    cy.visit(url + '/board?modal-issue-create=true');
    });
   //numHolder = cy.get('[placeholder="Number"]');

  });
  //data set with which we are creating issue, saved as variable
  const issueDetails = {
    title: "TEST_TITLE",
    type: "Bug",
    description: "TEST_DESCRIPTION",
    assignee: "Lord Gaben",
  };
  //number of issues we expect to see in the backlog after the test
  const EXPECTED_AMOUNT_OF_ISSUES = '5';
  it('Should create issue successfully', () => {
    IssueModal.createIssue(issueDetails);
    IssueModal.ensureIssueIsCreated(EXPECTED_AMOUNT_OF_ISSUES, issueDetails);
    cy.wait(1000);
    cy.get('[data-testid="list-issue"]').eq(0).scrollIntoView().click({ force: true });
  //});
  //it('Сheck that time tracker has no spent time added (“No Time Logged” label is visible)', () => {
  //Check that time tracker has no spent time added (“No Time Logged” label is visible)
  cy.get('[data-testid="modal:issue-details"]').should('be.visible').contains('No time logged');
  //it('User adds value 10 to “Original estimate (hours)” field',  () => {
      const newValue = '10';
      cy.wait(1000);
      cy.get('[placeholder="Number"]').should('be.visible').clear().type(newValue);
      cy.get('[placeholder="Number"]').should('have.value', newValue);
 //User closes issue detail page
  cy.get('[data-testid="icon:close"]').first().click();
  cy.wait(1000);
//User reopens the same issue to check that original estimation is saved
cy.get('[data-testid="list-issue"]').eq(0).scrollIntoView().click({ force: true });
//bug 10 as value not saved
});
});

