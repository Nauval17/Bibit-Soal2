describe('CobaPertama', () => {
    it('Verify Title - True', () => {
      cy.visit('https://demo.nopcommerce.com/')
      cy.title().should('eq','nopCommerce demo store')
    })
    it('Verify Title - False', () => {
      cy.visit('https://demo.nopcommerce.com/')
      cy.title().should('eq','nopCommerce store')
    })
  })