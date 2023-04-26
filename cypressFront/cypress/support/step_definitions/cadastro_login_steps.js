import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

let nomeUsuario, emailUsuario;

Given("que estou na pagina inicial", () => {
  cy.visit("https://front.serverest.dev/");
});

When('clico no botao {string}', (botao) => {
  cy.contains(botao).click();
});

Then("devo ser redirecionado para a pagina de cadastro", () => {
  cy.url().should("include", "/cadastrarusuarios");
});

Then("preencho o formulario de cadastro com dados validos", () => {
  nomeUsuario = "Nome do Usuário" + Math.floor(Math.random() * 1000); 
  emailUsuario = `email${Math.floor(Math.random() * 1000)}@example.com`;
  cy.get('[data-testid="nome"]').type(nomeUsuario);
  cy.get('[data-testid="email"]').type(emailUsuario);
  cy.get('[data-testid="password"]').type("senha123");
});

Then("marco a opcao {string}", (opcao) => {
  cy.contains(opcao).check();
});

Then('clico no botao {string}', (botao) => {
  cy.contains(botao).click();
});

Then('devo ver a mensagem {string}', (mensagem) => {
  cy.contains(mensagem).should("be.visible");
});

Given("que estou na pagina de login", () => {
    cy.visit("https://front.serverest.dev/login");
});

When('preencho o formulario de login com credenciais validas', () => {
  cy.get('[data-testid="email"]').type(emailUsuario); 
  cy.get('[data-testid="senha"]').type("senha123");
});

Then('clico no botao {string}', (botao) => {
    cy.contains(botao).click();
  });

Then('devo ser redirecionado para a pagina inicial', () => {
    cy.get('[data-testid="home"]').should("be.visible");
  });