beforeEach(function () {
  cy.fixture('saucedemo').then(function(data) {
    this.data = data;
  })
}) 

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

  it('login as standard_user, add items, logout', function () {
    cy.visit(this.data.url);

    cy.get('[data-test="username"]').type(this.data.standard_user_login);
    cy.get('[data-test="password"]').type(this.data.password);
  
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory');

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge');
    cy.get('[data-test="remove-sauce-labs-backpack"]');

    cy.get('#item_4_title_link > .inventory_item_name')
    .invoke('text').as('firstItemName')
    .then(() => {
      let firstItemName = this.firstItemName
  
      cy.get('.inventory_item .inventory_item_price:eq(0)')
      .invoke('text').as('firstItemPrice')
      .then(() => {
        openShoppingCart();

        cy.get('.inventory_item_name') //check first item lbl 
        .invoke('text')
        .should('eq', firstItemName)

        cy.get('.cart_item .inventory_item_price:eq(0)') //check first item price
        .invoke('text')
        .should('eq', this.firstItemPrice)
        cy.get('[data-test="continue-shopping"]').click()
      })
   })
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('.shopping_cart_badge');
    cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]');
    cy.get('#item_1_title_link > .inventory_item_name')
    .invoke('text').as('secondItemName')
    .then(() => {
      let secondItemName = this.secondItemName
    
      cy.get('.inventory_item .inventory_item_price:eq(2)')
      .invoke('text').as('secondItemPrice')
      .then(() => {
        openShoppingCart();

        cy.get('#item_4_title_link > .inventory_item_name') //check first item lbl 
        .invoke('text')
        .should('eq', this.firstItemName)

        cy.get('.cart_item .inventory_item_price:eq(0)') //check both items price
        .invoke('text')
        .should('eq', this.firstItemPrice)

        cy.get('#item_1_title_link > .inventory_item_name') //check second item lbl 
        .invoke('text')
        .should('eq', secondItemName)

        cy.get('.cart_item .inventory_item_price:eq(1)')
        .invoke('text')
        .should('eq', this.secondItemPrice)
    
        cy.get('[data-test="checkout"]').click();
        cy.url().should('include', '/checkout-step-one')
    
        cy.get('[data-test="firstName"]').type(this.data.Name)
        cy.get('[data-test="lastName"]').type(this.data.LastName)
        cy.get('[data-test="postalCode"]').type(this.data.ZipCode)
    
        cy.get('[data-test="continue"]').click()
        cy.url().should('include', '/checkout-step-two')

        cy.get('.cart_item .inventory_item_price:eq(0)') //check both items price
        .invoke('text').as('firstItemtotal')
        .then(() => {
          let firstItemtotal = parseFloat(this.firstItemtotal.replace('$', ''))
      
          cy.get('.cart_item .inventory_item_price:eq(1)')
          .invoke('text').as('secondItemtotal')
          .then(() => {
            let secondItemtotal = parseFloat(this.secondItemtotal.replace('$', ''))

            cy.get('.summary_subtotal_label')
            .invoke('text').as('subtotal')
            .then(() => {
                let subtotal = parseFloat(this.subtotal.replace('Item total: $', ''))
                cy.log(subtotal) 
                expect(firstItemtotal+secondItemtotal).to.equal(subtotal)
            })
          })
       })
        cy.get('[data-test="finish"]').click()
        cy.url().should('include', '/checkout-complete')
      })
    })
    logout();
  })

  it('login as locked_user', function () {
    cy.visit(this.data.url);
    cy.get('[data-test="username"]').type(this.data.locked_user_login);
    cy.get('[data-test="password"]').type(this.data.password);
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]');
  }) 
})