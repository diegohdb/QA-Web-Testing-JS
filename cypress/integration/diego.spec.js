// Cypress version: 6.5.0

context('Diego', () => {
    beforeEach(() => {
      // rota para os endpoints que trazem cada post
      cy.intercept({
        method: 'GET',
        path: '/_next/data/**'
      }).as('data')
  
      // rota para o último script de ads que é executado ao acessar
      cy.intercept({
        method: 'GET',
        url: 'https://pagead2.googlesyndication.com/bg/*'
      }).as('google')
  
      cy.visit('https://eresmama.com/');
  
      cy.get('#didomi-notice-agree-button').click()
  
      cy.wait('@data').its('response.statusCode').should('eq', 200)
  
      // eventualmente essa request demora mais para ser disparada, devido ao número de requests que ocorrem antes
      cy.wait('@google', { requestTimeout: 15000 }).its('response.statusCode').should('eq', 200)
  
    });
    it('Teste', () => {
  
      // trazendo a área que está abaixo deste elemento para a área visível,
      // o que garante que o elemento estará em uma área disponível para o clique
      cy
        .contains('También te recomendamos')
        .scrollIntoView()
  
      // desabilitando a espera pelas animações &
      // forçando o clique
      cy.get('.loading-more button')
        .click({
            waitForAnimations: false, 
            force: true
          })
  
      cy.wait('@data').its('response.statusCode').should('eq', 200)
  
    });
  });