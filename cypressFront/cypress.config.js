const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "browser": "chrome,firefox",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
