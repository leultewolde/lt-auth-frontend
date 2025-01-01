describe("Register and Login Flow", () => {
    it("should allow a user to register and then log in", () => {
        // Visit the registration page
        const uniqueEmail = `test${Date.now()}@example.com`;
        cy.visit("/auth/register?prefix=http&host=localhost&port=3000&resources=dashboard");

        // Fill out the registration form
        cy.get("input[name='firstName']").type("John");
        cy.get("input[name='lastName']").type("Doe");
        cy.get("input[name='email']").type(uniqueEmail);
        cy.get("input[name='password']").type("password");
        cy.get("input[name='phone']").type("1234567890");

        // Submit the form
        cy.get("button").contains("Register").click();

        // Assert redirection to the login page
        cy.url().should("include", "/auth/login?prefix=http&host=localhost&port=3000&resources=dashboard");

        // Log in with the registered user
        cy.get("input[name='email']").type(uniqueEmail);
        cy.get("input[name='password']").type("password");
        cy.get("button").contains("Login").click();

        // Assert redirection to the dashboard
        cy.url().should("include", "/dashboard");
    });
});
