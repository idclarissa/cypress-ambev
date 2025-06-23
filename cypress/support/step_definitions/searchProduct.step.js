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
  cy.wait(4000)
  cy.intercept('GET', '**/produtos').as('getProdutos');
  cy.visit('https://front.serverest.dev/home');
  cy.wait('@getProdutos');
});

Then('o produto no índice {int} deve estar visível na lista', (index) => {
  cy.get('.card-body', { timeout: 300 }) 
    .eq(0) 
    .should('be.visible'); 
});

When('adiciono produtos à minha lista de compras', () => {
  cy.get('[data-testid="adicionarNaLista"]').first().within(() => {
  cy.contains('button', 'Adicionar a lista').click();
  });
});

Then('o produto deve aparecer na lista de compras', () => {
  cy.get('[data-testid="carrinho"]').click();
  cy.get('[data-testid="lista-produtos"]')
    .children()
    .should('have.length.greaterThan', 0);
});

let token = '';
let produtoId = '';
let ultimaResposta = null;

When('adiciono um produto à lista de compras', () => {
  cy.url().should('include', '/home');

  cy.get('div.card').first().within(() => {
    cy.get('[data-testid="adicionarNaLista"]').invoke('text').then((text) => {
      nomeProduto = text.trim();
    });

    cy.contains('button', 'Adicionar a lista').click();
  });
});

Then('o produto deve aparecer na tela de lista de produtos', () => {
  cy.visit('https://front.serverest.dev/minhaListaDeProdutos');
  cy.contains(nomeProduto).should('exist');
});