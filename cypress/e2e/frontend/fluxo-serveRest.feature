Feature: Skome test - Fluxo completo de cadastro de usuário e adição de produto e validação do mesmo 

  Scenario: Cadastrar um novo usuário admin com sucesso
    Given que acesso a página de cadastro de usuários
    When preencho o formulário de cadastro com nome, email e senha válidos
    And confirmo o cadastro
    Then deve exibir mensagem de sucesso "Cadastro realizado com sucesso"

  Scenario: Cadastrar novo produto e validar o mesmo 
    Given que acesso a página de login
    When faço login com o usuário recém-cadastrado
    Then devo ser redirecionado para a página inicial
    When acesso a tela de cadastro de produtos
    When preencho os dados do produto e anexo uma imagem
    When envio o formulário
    Given que acesso a página de login
    When faço login com o usuário recém-cadastrado
    When acesso a listagem de produtos
    Then o produto no índice 0 deve estar visível na lista

  Scenario: Cadastrar um novo usuário não administrador e adicionar item na lista
    Given que estou na página de cadastro de usuários
    When preencho o formulário com dados de usuário comum válidos
    When confirmo o cadastro
    Then deve exibir mensagem de sucesso "Cadastro realizado com sucesso"
    When adiciono um produto à lista de compras

