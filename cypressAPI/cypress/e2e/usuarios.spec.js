describe('Consulta de Usuarios', () => {
  it('Validar resposta da pesquisa de todos os usuarios', () => {
    cy.request('GET', Cypress.env('GET_USUARIOS'))
      .then((response) => {
        cy.wrap(response).its('status').should('eq', 200);
        cy.wrap(response.body).should('have.property', 'usuarios');
        cy.wrap(response.body.usuarios).should('be.an', 'array');
        cy.wrap(response.body.usuarios).should('not.be.empty');
        cy.wrap(response.body.usuarios[0]).should('have.property', 'nome');
        cy.wrap(response.body.usuarios[0]).should('have.property', 'email');
        cy.wrap(response.body.usuarios[0]).should('have.property', 'password');
      });
  });
});

describe('Inserir Usuario', () => {
  let userId;
  let userEmail;

  it('Criar um usuario', () => {
    const nome = `Usuario ${Math.floor(Math.random() * 100000)}`;
    userEmail = `${nome.replace(' ', '').toLowerCase()}@example.com`;
    const password = `senha${Math.floor(Math.random() * 100000)}`;
    const administrador = 'true';

    const url = Cypress.env('POST_USUARIO');

    cy.request({
      method: 'POST',
      url,
      body: JSON.stringify({
        nome,
        email: userEmail,
        password,
        administrador,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      cy.wrap(response).its('status').should('eq', 201);

      userId = response.body._id;
    });
  });

  it('Verificar se o ID do usuario foi armazenado corretamente', () => {
    cy.wrap(userId).should('not.be.undefined');
  });

  it('Cadastro de usuario com e-mail já cadastrado retorna status 400', () => {
    const nome = `Usuario ${Math.floor(Math.random() * 100000)}`;
    const email = userEmail;
    const password = `senha${Math.floor(Math.random() * 100000)}`;
    const administrador = 'true';

    const url = Cypress.env('POST_USUARIO');

    cy.request({
      method: 'POST',
      url,
      body: JSON.stringify({
        nome,
        email,
        password,
        administrador,
      }),
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      cy.wrap(response).its('status').should('eq', 400);
      cy.wrap(response.body).should('have.property', 'message').and('eq', 'Este email já está sendo usado');
    });
  });

  it('Consultar um usuario', () => {
    cy.request('GET', `${Cypress.env('GET_USUARIOS')}/${userId}`).then(
      (response) => {
        cy.wrap(response).its('status').should('eq', 200);
        cy.wrap(response.body).should('have.property', 'nome');
        cy.wrap(response.body).should('have.property', 'email');
        cy.wrap(response.body).should('have.property', '_id').and('eq', userId);
        cy.wrap(response.body).should('have.property', 'administrador');
      }
    );
  });

  it('Consultar um usuario que nao existe retorna status 400', () => {
    const usuarioIdNaoExistente = '123456789'; 
    const url = `${Cypress.env('GET_USUARIOS')}/${usuarioIdNaoExistente}`; 

    cy.request({
      method: 'GET',
      url,
      failOnStatusCode: false,
    }).then((response) => {
      cy.wrap(response).its('status').should('eq', 400);
      cy.wrap(response.body).should('have.property', 'message').and('eq', 'Usuário não encontrado');
    });
  });
it('Atualizar um usuario existente', () => {
    const nomeAtualizado = `Usuario Atualizado ${Math.floor(Math.random() * 100000)}`;
    const passwordAtualizado = `senhaAtualizada${Math.floor(Math.random() * 100000)}`;
    const emailAtualizado = userEmail;
    const administradorAtualizado = 'true';

    const url = `${Cypress.env('PUT_USUARIO')}/${userId}`;

    cy.request({
      method: 'PUT',
      url,
      body: JSON.stringify({
        nome: nomeAtualizado,
        password: passwordAtualizado,
        email: emailAtualizado,
        administrador: administradorAtualizado,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      cy.wrap(response).its('status').should('eq', 200);
      cy.wrap(response.body).should('have.property', 'message').and('eq', 'Registro alterado com sucesso');
    });
  });
  it('Atualizar um usuario com e-mail ja cadastrado para outro usuario retorna status 400', () => {
    const nomeAtualizado = `Usuario Atualizado ${Math.floor(Math.random() * 100000)}`;
    const passwordAtualizado = `senhaAtualizada${Math.floor(Math.random() * 100000)}`;
    const emailAtualizado = 'fulano@qa.com';
    const administradorAtualizado = 'true';
  
    const url = `${Cypress.env('PUT_USUARIO')}/${userId}`;
  
    cy.request({
      method: 'PUT',
      url,
      body: JSON.stringify({
        nome: nomeAtualizado,
        password: passwordAtualizado,
        email: emailAtualizado,
        administrador: administradorAtualizado,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,
    }).then((response) => {
      cy.wrap(response).its('status').should('eq', 400);
    });
  });

  it('Deletar um usuario', () => {
    cy.request('DELETE', `${Cypress.env('DELETE_USUARIO')}/${userId}`).then(
      (response) => {
        cy.wrap(response).its('status').should('eq', 200);
        cy.wrap(response.body).should('have.property', 'message').and('eq', 'Registro excluído com sucesso');
      });
  });
});
