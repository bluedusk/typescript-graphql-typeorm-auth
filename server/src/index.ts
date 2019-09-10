import "reflect-metadata";
import "dotenv/config";
import { createConnection } from "typeorm";
import express = require("express");
import session = require("express-session");
import { ApolloServer } from "apollo-server-express";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // pass request object to context so that we can use it in resolver
    context: ({ req }) => ({ req })
  });
  await createConnection();
  const app = express();

  // express session middleware
  app.use(
    session({ secret: "some secret", resave: false, saveUninitialized: false })
  );
  server.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000",
      credentials: true
    }
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
