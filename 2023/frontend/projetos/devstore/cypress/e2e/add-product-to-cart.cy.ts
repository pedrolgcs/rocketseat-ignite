describe('[e2e] Add product to cart', () => {
  it('should be able to navigate to the product page and add it to the cart', () => {
    // sut
    cy.visit('http://localhost:3000')

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
    // sut
    cy.visit('http://localhost:3000')

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
    // sut
    cy.visit('http://localhost:3000')

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
