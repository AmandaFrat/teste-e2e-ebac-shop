class cadastroPage {
    concluirCadastro(Pais, Endereco, Cidade, Estado, CEP, Telefone) {
        cy.get('#select2-billing_country-container').click().type(Pais + '{enter}')
        cy.get('#billing_address_1').type(Endereco)
        cy.get('#billing_city').type(Cidade)
        cy.get('#select2-billing_state-container').click().type(Estado + '{enter}')
        cy.get('#billing_postcode').type(CEP)
        cy.get('#billing_phone').type(Telefone)
    }
}

export default new cadastroPage()