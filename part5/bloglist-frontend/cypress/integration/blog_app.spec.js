



describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.request('POST', 'http://localhost:3003/api/users', {username:'testUsername', name:'testName', password:'testPassword'})
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('Log in').click()

    })
    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('Log in').click()
            cy.get('#username').type('testUsername')
            cy.get('#password').type('testPassword')
            cy.get('#logInFormSubmit').click()
            cy.contains('testName')
        })
    
        it('fails with wrong credentials', function() {
            cy.contains('Log in').click()
            cy.get('#username').type('testUsernamewrong')
            cy.get('#password').type('testPasswordwrong')
            cy.get('#logInFormSubmit').click()
            cy.contains('wrong username or password')
        })
      })

      describe('When logged in', function() {
        beforeEach(function() {
            cy.contains('Log in').click()
            cy.get('#username').type('testUsername')
            cy.get('#password').type('testPassword')
            cy.get('#logInFormSubmit').click()
        })
    
        it('A blog can be created', function() {
          cy.get('#title').type('testTitle')
          cy.get('#author').type('testAuthor')
          cy.get('#url').type('testUrl')
          cy.get('#submitBlog').click()
          cy.contains('testAuthor')
          cy.contains('a new blog testTitle was added')
          cy.contains('view')
        })

        it('A blog can be liked', function() {
            cy.get('#title').type('testTitle')
            cy.get('#author').type('testAuthor')
            cy.get('#url').type('testUrl')
            cy.get('#submitBlog').click()
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('likes: 1')
            
        })
        it('A blog can be deleted by its creator', function() {
            cy.get('#title').type('testTitle')
            cy.get('#author').type('testAuthor')
            cy.get('#url').type('testUrl')
            cy.get('#submitBlog').click()
            cy.visit('http://localhost:3000')
            cy.contains('view').click()
            cy.contains('delete').click()
            cy.visit('http://localhost:3000')
            cy.contains('testTitle').should('not.exist')
        })
        it.only('blogs are sorted by most liked to least liked', function(){
            cy.get('#submitBlog').click()
            cy.get('#submitBlog').click()
            cy.get('#submitBlog').click()
            cy.get('#submitBlog').click()

            cy.visit('http://localhost:3000')
            cy.contains('view').click()
            let count=5;
            cy.get('.likeButton').each(likeButton => {
                for (let i=0;i<count;i++){

                    likeButton.click();
                }
            count += 10
            }).then(likeButtons => {cy.wait(2000)
            cy.visit('http://localhost:3000')
           cy.get('.likes').then(likes => {

               expect(parseInt(likes[0].innerHTML)>parseInt(likes[1].innerHTML)).to.be.true
               expect(parseInt(likes[1].innerHTML)>parseInt(likes[2].innerHTML)).to.be.true
               expect(parseInt(likes[2].innerHTML)>parseInt(likes[3].innerHTML)).to.be.true
        
        })})
           
        })
      })
  })