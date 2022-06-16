beforeEach(function () {
  cy.fixture('exemple').then(function(data) {
    this.data = data;
    cy.log('Data: ', this.data)
  })
}) 

const goHome = () => {
  cy.visit('https://www.saucedemo.com/')
}

const openShoppingCart = () => {
  cy.get('#shopping_cart_container').click();
  cy.url().should('include', '/cart');
}

const logout = () => {
  cy.get('#react-burger-menu-btn').click();
  cy.get('#logout_sidebar_link').click();
  cy.get('[data-test="login-button"]');
} 

describe('test set for web automation', () => {

  it('login as standerd_user, add items, logout', function () {

    goHome();

    cy.get('[data-test="username"]').type(this.data.standardUser_login);
    cy.get('[data-test="password"]').type(this.data.password);
  
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory');

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.inventory_item .inventory_item_price:eq(0)')
    cy.get('.shopping_cart_badge');
    cy.get('[data-test="remove-sauce-labs-backpack"]');

    openShoppingCart();
    cy.get('.cart_item .inventory_item_price:eq(0)')
    //add checking of total amount
    cy.get('[data-test="continue-shopping"]').click()
  

    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('.inventory_item .inventory_item_price:eq(3)')
    cy.get('.shopping_cart_badge');
    cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]');

    openShoppingCart();
    cy.get('.cart_item .inventory_item_price:eq(1)')
    //add checking of total amount

    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one')

    cy.get('[data-test="firstName"]').type(this.data.Name)
    cy.get('[data-test="lastName"]').type(this.data.LastName)
    cy.get('[data-test="postalCode"]').type(this.data.ZipCode)

    cy.get('[data-test="continue"]').click()
    cy.url().should('include', '/checkout-step-two')
    //add checking of total amount
    cy.get('[data-test="finish"]').click()
    cy.url().should('include', '/checkout-complete')

    logout();
  })
   
  it('login as locked_user', function () {
    cy.get('[data-test="username"]').type(this.data.lockedUser_login);
    cy.get('[data-test="password"]').type(this.data.password);
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]');
  }) 
})
