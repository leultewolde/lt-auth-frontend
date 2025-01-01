import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'w5yh8k',
  e2e: {
    // Specify the directory for your test files
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    baseUrl: "http://localhost:3000", // Replace with your app's base URL
    supportFile: "cypress/support/e2e.ts",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
