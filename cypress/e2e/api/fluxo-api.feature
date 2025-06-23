Feature: Skome test - Gerenciamento de usuários via API como administrador

  Scenario: Cadastro de usuário administrador e definição do ID
    When envio uma requisição POST para "/usuarios" com dados válidos de admin
    Then a resposta deve conter status 201
    And a mensagem de retorno deve ser "Cadastro realizado com sucesso"

  Scenario: Edição dos dados do usuário cadastrado (PUT)
    Given que o ID do usuário administrador está salvo
    When envio uma requisição PUT para o endpoint "/usuarios" com o ID do usuário e dados atualizados
    Then a resposta deve conter status 200
    And a mensagem de retorno deve ser "Registro alterado com sucesso"

  Scenario: Exclusão do usuário cadastrado (DELETE)
    Given que o ID do usuário administrador está salvo
    When envio uma requisição DELETE para o endpoint "/usuarios" com o ID do usuário
    Then a resposta deve conter status 200
    And a mensagem de retorno deve ser "Registro excluído com sucesso"
