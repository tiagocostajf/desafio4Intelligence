Funcionalidade: Efetuar Login
  Como um usuário
  Eu quero poder fazer login
  Para que eu possa acessar o site

  Cenário: Efetuar cadastro com sucesso
    Dado que estou na pagina inicial
    Quando clico no botao "Cadastre-se"
    Então devo ser redirecionado para a pagina de cadastro
    E preencho o formulário de cadastro com dados validos
    Então marco a opcao "Usuário Administrador"
    E eu clico no botão "Cadastrar"
    Então devo ver a mensagem "Cadastro realizado com sucesso"

  Cenário: Validar login com sucesso
    Dado que estou na pagina de login
    Quando eu preencho o formulario de login com credenciais validas
    E clico no botao "Entrar"
    Então devo ser redirecionado para a pagina inicial