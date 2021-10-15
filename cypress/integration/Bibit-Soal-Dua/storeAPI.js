describe('StoreAPI',()=>{
    context('Testing Petstore API',()=>{
        it('Should Get Inventory',()=>{
            cy.request({
                method: 'GET',
                url: '/store/inventory'
            })
            .should((response)=>{
                cy.log(JSON.stringify(response.body))
                expect(response.status).to.eq(200)
            })
        })

        it('Should Send Order and Get Order Based on ID',()=>{
            cy.request({
                method: 'POST',
                url: '/store/order',
                body: {
                    "id": 5,
                    "petId": 1,
                    "quantity": 1,
                    "shipDate": "2021-10-14T12:20:53.099Z",
                    "status": "placed",
                    "complete": true
                }
            })
            .should((response)=>{
                cy.log(JSON.stringify(response.body))
                expect(response.status).eq(200)
                expect(response.body.id).eq(5)
                expect(response.body.petId).eq(1)
                expect(response.body.quantity).eq(1)
                
                const userid = response.body.id
                cy.log(userid)
    
                cy.request({
                    method: 'GET',
                    url: '/store/order/'+userid
                })
                    .should((response)=>{
                        cy.log(JSON.stringify(response.body))
                        expect(response.status).eq(200)
                        expect(response.body.id).eq(5)
                        expect(response.body.petId).eq(1)
                        expect(response.body.quantity).eq(1)
                    })              
            })
        })

        it('Should Send Order and Delete Order Based on ID',()=>{
            cy.request({
                method: 'POST',
                url: '/store/order',
                body: {
                    "id": 6,
                    "petId": 1,
                    "quantity": 1,
                    "shipDate": "2021-10-14T12:20:53.099Z",
                    "status": "placed",
                    "complete": true
                }
            })
            .should((response)=>{
                cy.log(JSON.stringify(response.body))
                expect(response.status).eq(200)
                expect(response.body.id).eq(6)
                expect(response.body.petId).eq(1)
                expect(response.body.quantity).eq(1)
                
                const userid = response.body.id
                cy.log(userid)
    
                cy.request({
                    method: 'DELETE',
                    url: '/store/order/'+userid
                })
                    .should((response)=>{
                        expect(response.status).eq(200)
                    })              
            })
        })
    })
})