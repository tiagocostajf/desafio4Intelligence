module.exports = {
    env: {
      GET_USUARIOS: "/usuarios",
      POST_USUARIO: "/usuarios",
      PUT_USUARIO:"/usuarios",
      DELETE_USUARIO:"/usuarios",
    },
    e2e: {
      specPattern: "**/*.spec.js",
      baseUrl: "https://serverest.dev",
      setupNodeEvents(on, config) {
      },
    },
  };