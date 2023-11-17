describe('[e2e] Add product to cart', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to navigate to the product page and add it to the cart', () => {
    // act
    cy.get('a[href^="/product/"]').first().click()

    // assert
    cy.location('pathname').should('include', '/product/')

    // act
    cy.contains('Add to cart').click()

    // assert
    cy.contains('Cart 1').should('exist')
  })

  it('should not count duplicated products on cart', () => {
    // act
    cy.get('a[href^="/product/"]').first().click()

    // assert
    cy.location('pathname').should('include', '/product/')

    // act
    cy.contains('Add to cart').click()
    cy.contains('Add to cart').click()

    // assert
    cy.contains('Cart 1').should('exist')
  })

  it('should be able tos search for a product and add it to the cart', () => {
    // act
    cy.get('input[name=q]').type('moletom').parent('form').submit()

    // act
    cy.get('a[href^="/product/"]').first().click()

    // assert
    cy.location('pathname').should('include', '/product/')

    // act
    cy.contains('Add to cart').click()

    // assert
    cy.contains('Cart 1').should('exist')
  })
})
