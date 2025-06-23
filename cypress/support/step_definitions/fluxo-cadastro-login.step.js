import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

let emailGerado = '';
const senha = '123456';

/* ---------- CENÁRIO 1 ---------- */
Given('que acesso a página de cadastro de usuários', () => {
  cy.visit('https://front.serverest.dev/cadastrarusuarios');
});

When('preencho o formulário de cadastro com nome, email e senha válidos', () => {
  const nome = `ambevtest${Date.now()}`;
  emailGerado = `${nome}@teste.com`;

    const email = `${nome}@teste.com`;
    emailGerado = email;
    Cypress.env('emailGerado', email);

  cy.get('[data-testid=nome]').type(nome);
  cy.get('[data-testid=email]').type(Cypress.env('emailGerado'));
  cy.get('[data-testid=password]').type(senha);
  cy.get('[data-testid=checkbox]').check();
});

When('confirmo o cadastro', () => {
  cy.get('[data-testid=cadastrar]').click();
});

Then('deve exibir mensagem de sucesso {string}', (mensagemEsperada) => {
  cy.contains(mensagemEsperada).should('be.visible');
});

Given('que acesso a página de login', () => {
  cy.visit('https://front.serverest.dev/login');
});

When('faço login com o usuário recém-cadastrado', () => {
  cy.get('[data-testid=email]').type(emailGerado);
  cy.get('[data-testid=senha]').type(senha);
  cy.get('[data-testid=entrar]').click();
});

Then('devo ser redirecionado para a página inicial', () => {
  cy.contains('Listar Produtos').should('be.visible');
});
