///<reference types="cypress"/>
import '@testing-library/cypress/add-commands';

describe('YouTube App', () => {
  beforeEach(() => {
    cy.intercept('GET', /(mostPopular)/g, {
      fixture: 'hotTrendVideos.json',
    });
    cy.intercept('GET', /(search)/g, {
      fixture: 'searchVideos.json',
    });
    cy.intercept('GET', /(relatedToVideoId)/g, {
      fixture: 'relatedVideos.json',
    });
    cy.intercept('GET', /(channels)/g, {
      fixture: 'channel.json',
    });
    cy.viewport(1200, 800);
    cy.visit('/');
  });

  it('renders', () => {
    cy.findByText('YouTube').should('exist');
  });

  it('shows popular video first', () => {
    cy.findAllByAltText('main video title').first().should('exist');
    cy.findByText('main video title').should('exist');
    cy.findByText('main channel title').should('exist');
  });

  it('searchs by keyword at the main page', () => {
    cy.findByPlaceholderText('검색').type('bts');
    cy.findByTitle('검색버튼').click();
    cy.findAllByAltText('search video title').first().should('exist');
    cy.findByText('search video title').should('exist');
    cy.findByText('search channel title').should('exist');
  });

  it('goes to main page when logo is clicked', () => {
    cy.findByPlaceholderText('검색').type('bts');
    cy.findByTitle('검색버튼').click();
    cy.findByRole('link').click();

    cy.findAllByAltText('main video title').first().should('exist');
    cy.findByText('main video title').should('exist');
    cy.findByText('main channel title').should('exist');
  });

  it('goes to detail page from main page', () => {
    cy.findAllByRole('listitem').first().click();

    cy.findByTitle('main video title').should('exist');
    cy.findByText('main video title').should('exist');
    cy.findByText('main channel title').should('exist');

    cy.findAllByAltText('related video title').first().should('exist');
    cy.findByText('related video title').should('exist');
    cy.findByText('related channel title').should('exist');
  });

  it('goes to detail page from search page', () => {
    cy.findByPlaceholderText('검색').type('bts');
    cy.findByTitle('검색버튼').click();
    cy.findAllByRole('listitem').first().click();

    cy.findByTitle('search video title').should('exist');
    cy.findByText('search video title').should('exist');
    cy.findByText('search channel title').should('exist');

    cy.findAllByAltText('related video title').first().should('exist');
    cy.findByText('related video title').should('exist');
    cy.findByText('related channel title').should('exist');
  });

  it('goes to detail page from detail page', () => {
    cy.findAllByRole('listitem').first().click();
    cy.findAllByTestId('video-list').first().click();

    cy.findByTitle('related video title').should('exist');
    cy.findAllByText('related video title').first().should('exist');
    cy.findAllByText('related channel title').first().should('exist');

    cy.findAllByAltText('related video title').first().should('exist');
    cy.findAllByText('related video title').last().should('exist');
    cy.findAllByText('related channel title').last().should('exist');
  });

  it('searchs by keyword at the detail page', () => {
    cy.findAllByRole('listitem').first().click();
    cy.findByPlaceholderText('검색').type('bts');
    cy.findByTitle('검색버튼').click();
    cy.findAllByAltText('search video title').first().should('exist');
    cy.findByText('search video title').should('exist');
    cy.findByText('search channel title').should('exist');
  });
});
