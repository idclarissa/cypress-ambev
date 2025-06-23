import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

let usuario = {};
let usuarioId = null;
let ultimaResposta = null;


When('envio uma requisição POST para {string} com dados válidos de admin', () => {
  usuario = {
    nome: `Usuário Admin Testes${Date.now()}`,
    email: `admin_${Date.now()}@qa.com`,
    password: '123456',
    administrador: 'true'
  };

  cy.request({
    method: 'POST',
    url: 'https://serverest.dev/usuarios',
    body: usuario,
    failOnStatusCode: false
  }).then((res) => {
    ultimaResposta = res;
    usuarioId = res.body._id || res.body._idUsuario || res.body.id;
  });

});
Then('a resposta deve conter status {int}', (status) => {
  expect(ultimaResposta.status).to.eq(status);
});

Then('a mensagem de retorno deve ser {string}', (mensagem) => {
  expect(ultimaResposta.body.message).to.eq(mensagem);
});

Given('que o ID do usuário administrador está salvo', () => {
  expect(usuarioId).to.not.be.null;
  cy.log('ID do usuário cadastrado:', usuarioId);
});

When('envio uma requisição PUT para o endpoint {string} com o ID do usuário e dados atualizados', (endpoint) => {
  const dadosAtualizados = {
    nome: `Usuário Atualizado ${Date.now()}`,
    email: `atualizado_${Date.now()}@qa.com`,
    password: '654321',
    administrador: 'true'
  };

  cy.request({
    method: 'PUT',
    url: `https://serverest.dev${endpoint}/${usuarioId}`,
    body: dadosAtualizados,
    failOnStatusCode: false
  }).then((res) => {
    ultimaResposta = res;
  });
});

When('envio uma requisição DELETE para o endpoint {string} com o ID do usuário', (endpoint) => {
  cy.request({
    method: 'DELETE',
    url: `https://serverest.dev${endpoint}/${usuarioId}`,
    failOnStatusCode: false
  }).then((res) => {
    ultimaResposta = res;
    cy.log('ID do usuário cadastrado:', usuarioId);

  });
});
