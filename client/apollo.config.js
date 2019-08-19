const path = require("path");

module.exports = {
  client: {
    service: {
      name: "my-project",
      url: "http://localhost:4000/graphql",
      skipSSLValidation: true
      // TODO: use schema.graphql file
      //   localSchemaFile: path.join(__dirname, "../server/schema.graphql")
    }
  }
};
