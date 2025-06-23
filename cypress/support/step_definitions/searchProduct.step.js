import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

/* ---------- CENÁRIO 2 ---------- */

Given('que acesso a página de cadastro de produto', () => {
  cy.visit('https://front.serverest.dev/admin/cadastrarprodutos');
});

When('acesso a tela de cadastro de produtos', () => {
  cy.get('[data-testid=cadastrar-produtos]').click();
});

When('preencho os dados do produto e anexo uma imagem', () => {
  
  produtoNome = `produto-${Date.now()}`;

  cy.get('[data-testid=nome]').type(produtoNome);
  cy.get('[data-testid=preco]').type('199');
  cy.get('[data-testid=descricao]').type('Produto de teste com imagem');
  cy.get('[data-testid=quantity]').type('5');

  const imagePath = 'testAmbev.png'; 
  cy.get('input[type="file"]').selectFile(`cypress/fixtures/${imagePath}`);
});

When('envio o formulário', () => {
  cy.get('[data-testid=cadastarProdutos]').click();
});

/* --------- CENÁRIO 3 --------- */

When('acesso a listagem de produtos', () => {
  cy.visit('https://front.serverest.dev/admin/listarprodutos');
  cy.intercept('GET', '**/produtos').as('getProdutos');
  cy.wait('@getProdutos');
});

Then('o produto com descrição {string} deve estar visível na lista', (descricao) => {
  cy.get('table').contains('td', descricao).should('be.visible');
});