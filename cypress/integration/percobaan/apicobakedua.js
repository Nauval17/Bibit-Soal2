describe('Post API',()=>{
    context('Percobaan Post API',()=>{
        it('Mengirimkan data',()=>{
            cy.request({
                method: 'POST',
                url: '/usuarios',
                body:{
                    nome: "Dumb Joel",
                    email: "dumb.joe@qa.com.br",
                    password: "test",
                    administrador: "true"
                }
            })
            .should((response)=>{
                expect(response.status).eq(201)
                expect(response.body.message).eq("Cadastro realizado com sucesso")
            })
        })
    })
})