describe("Note App ", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Testuser",
      username: "Test1",
      password: "test",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);

    cy.visit("http://localhost:5173");
  });

  it("front page can be opened", function () {
    cy.contains("Notes App");
    cy.contains("Fullstack Open 2023");
  });

  it("login form can be opened", function () {
    cy.contains("Authenticate").click();
    cy.get("#username").type("Test1");
    cy.get("#password").type("test");
    cy.get("#login-button").click();
    cy.contains("Testuser");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("Authenticate").click();
      cy.get("#username").type("Test1");
      cy.get("#password").type("test");
      cy.get("#login-button").click();
    });

    it("a new note can be created", function () {
      cy.contains("New Note").click();
      cy.get("#new-note").type("a note created by cypress");
      cy.contains("Save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.contains("New Note").click();
        cy.get("input").type("another note cypress");
        cy.contains("Save").click();
      });
      it("it can be made important", function () {
        cy.contains("another note cypress").get("#toggle-importance").click();

        cy.contains("another note cypress")
          .get("#toggle-importance")
          .contains("Make important");
      });
    });
  });
  it("login fails with wrong password", function () {
    cy.contains("Authenticate").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get("#error-message").contains("Wrong credentials, please try again");
    cy.get('html').should('not.contain', 'Testuser')
  });
});
