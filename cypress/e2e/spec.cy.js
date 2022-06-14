const goHome = () => {
  cy.visit('https://www.saucedemo.com/')
}
const loginAs = (username) => {
  cy.get('[data-test="username"]')
  .type(username)
  .should("have.value", username);

  cy.get('[data-test="password"]')
  .type('secret_sauce')
  .should("have.value", "secret_sauce");

  cy.get('[data-test="login-button"]').click();
}

const openShoppingCart = () => {
  cy.get('#shopping_cart_container').click();
  cy.url().should('include', '/cart');
}

const openArticlePanel = () => {
  cy.get('[data-test="continue-shopping"]').click();
  cy.url().should('include', '/inventory');
}

const logout = () => {
  cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
    cy.get('[data-test="login-button"]');
}

describe('add items to cart', () => {
  it('login, add items, logout', () => {
    goHome();
    loginAs('standard_user');
    cy.url().should('include', '/inventory');

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge');
    cy.get('[data-test="remove-sauce-labs-backpack"]');

    openShoppingCart();
    //add checking of total amount

    openArticlePanel();

    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('.shopping_cart_badge');
    cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]');

    openShoppingCart();
    //add checking of total amount

    openArticlePanel();
    logout();
  
  })
   
  it('login as locked_user', () =>{
    loginAs('locked_out_user');
    cy.get('[data-test="error"]');
  })
})