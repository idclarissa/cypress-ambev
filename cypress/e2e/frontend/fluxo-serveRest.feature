Feature: Fluxo completo de cadastro de usuário e adição de produto e validação do mesmo 

  Scenario: Cadastrar um novo usuário com sucesso
    Given que acesso a página de cadastro de usuários
    When preencho o formulário de cadastro com nome, email e senha válidos
    And confirmo o cadastro
    Then deve exibir mensagem de sucesso "Cadastro realizado com sucesso"

  Scenario: Logar com o usuário recém-cadastrado e cadastrar novo produto 
    Given que acesso a página de login
    When faço login com o usuário recém-cadastrado
    Then devo ser redirecionado para a página inicial
    When acesso a tela de cadastro de produtos
    When preencho os dados do produto e anexo uma imagem
    And envio o formulário

  Scenario: Validando produto recém criado
    Given que acesso a página de login
    When faço login com o usuário recém-cadastrado
    When acesso a listagem de produtos
    Then o produto com descrição "Produto de teste com imagem" deve estar visível na lista


