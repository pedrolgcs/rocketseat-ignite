describe('[e2e] Search products', () => {
  it('should be able to search products', () => {
    cy.visit('/')

    // act
    cy.get('input[name=q]').type('moletom').parent('form').submit()

    // assert
    cy.location('pathname').should('include', '/search')

    // assert
    cy.location('search').should('include', 'q=moletom')

    // act
    cy.get('a[href^="/product/"]').should('exist')
  })

  it('should not be able to visit search page without a search query', () => {
    cy.on('uncaught:exception', () => {
      return false
    })

    cy.visit('/search')

    cy.location('pathname').should('equal', '/')
  })
})
