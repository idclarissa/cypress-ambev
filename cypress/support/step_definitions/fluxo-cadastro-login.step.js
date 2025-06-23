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

Given('que acesso a página de login', () => {
  cy.visit('https://front.serverest.dev/login');
});

When('faço login com o usuário recém-cadastrado', () => {
  cy.wait(2222)
  
  cy.get('[data-testid=email]').type(emailGerado);
  cy.get('[data-testid=senha]').type(senha);
  cy.get('[data-testid=entrar]').click();
});

Then('devo ser redirecionado para a página inicial', () => {
  cy.contains('Produtos').should('be.visible');
});

let usuario = {};

Given('que estou na página de cadastro de usuários', () => {
  cy.visit('https://front.serverest.dev/cadastrarusuarios');
  cy.url().should('include', '/cadastrarusuarios');
});

When('preencho o formulário com dados de usuário comum válidos', () => {
  usuario = {
    nome: `Usuário Comum ${Date.now()}`,
    email: `comum_${Date.now()}@qa.com`,
    senha: '123456'
  };

  cy.get('[data-testid="nome"]').type(usuario.nome);
  cy.get('[data-testid="email"]').type(usuario.email);
  cy.get('[data-testid="password"]').type(usuario.senha);
});

Then('deve exibir mensagem de sucesso {string}', (mensagemEsperada) => {
  cy.contains(mensagemEsperada).should('be.visible');
});