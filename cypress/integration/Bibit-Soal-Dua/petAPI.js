describe('Pet API',()=>{
  it('Add Pet',()=>{

    cy.fixture('petdata').then((datapet)=>{
      //Create Data Pet
      cy.request({
        method: 'POST',
        url: '/pet',
        body: {
          "id": datapet.id,
          "category": datapet.category,
          "name": datapet.name,
          "photoUrls": datapet.photoUrls,
          "tags": datapet.tags,
          "status": datapet.status
        }
      })
      .then((response)=>{
        cy.log(JSON.stringify(response.body))
        expect(response.status).eq(200)
        expect(response.body.category.name).eq(datapet.category.name)
        expect(response.body).has.property("tags")
      })
    })
  })

  it('Update Pet, Get Pet, Delete Pet',()=>{
      //Get Data Pet
    cy.fixture('petdata').then((datapet)=>{
      cy.request({
        method: 'PUT',
        url: '/pet',
        body:{
          "id": 150,
          "category": datapet.category,
          "name": "Brian",
          "photoUrls": datapet.photoUrls,
          "tags": datapet.tags,
          "status": "sold"
          }
        })
        .then((response)=>{
          cy.log(JSON.stringify(response.body))
          expect(response.status).eq(200)
          expect(response.body).has.property("name")
        })      
        .then((response)=>{
          const petID = response.body.id
          cy.request({
            method: 'GET',
            url: '/pet/'+petID
        })
        .then((response)=>{
          cy.log(JSON.stringify(response.body))
          expect(response.status).eq(200)
          expect(response.body.name).eq("Brian")
          expect(response.body.status).eq("available")
        })
      })
      .then((response)=>{
        const petID = response.body.id
        cy.request({
          method: 'DELETE',
          url: '/pet/'+petID,
          headers: {
            "api_key": "Coba"
          }
        })
        .then((response)=>{
          cy.log(response.status)
        })
      })
    })
  })  
})