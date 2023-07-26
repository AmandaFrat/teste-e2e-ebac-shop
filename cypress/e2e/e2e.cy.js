/// <reference types="cypress" />
const { faker } = require('@faker-js/faker');
import cadastroPage from '../support/page_objects/cadastro.page'

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.addProdutos('Abominable Hoodie', 'XS', 'Blue', 1)
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get(':nth-child(2) > .page-numbers').click()
        cy.addProdutos('Atlas Fitness Tank', 'M', 'Blue', 1)
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get(':nth-child(2) > .page-numbers').click()
        cy.addProdutos('Atomic Endurance Running Tee (Crew-Neck)', 'L', 'Black', 1)
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get(':nth-child(2) > .page-numbers').click()
        cy.addProdutos('Augusta Pullover Jacket', 'M', 'Red', 1)

        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

        let nomeFaker = faker.name.firstName()
        let sobrenomeFaker = faker.name.lastName()
        let emailFaker = faker.internet.email()
        cy.get('#billing_first_name').type(nomeFaker)
        cy.get('#billing_last_name').type(sobrenomeFaker)
        cadastroPage.concluirCadastro('Brasil', 'Rua A nº2', 'Vitória', 'Espírito Santo', '01000100', '999999999')
        cy.get('#billing_email').type(emailFaker)

        cy.get('#payment_method_bacs').click()
        cy.get('#terms').check()
        cy.get('#place_order').click()

        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')

    });


})