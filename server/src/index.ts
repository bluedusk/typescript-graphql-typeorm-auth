import "reflect-metadata";
import "dotenv/config";
import { createConnection } from "typeorm";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./constants";
import { ApolloServer } from "apollo-server-express";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import { createTokens } from "./auth";

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // pass request object to context so that we can use it in resolver
    context: ({ req, res }) => ({ req, res }),
    formatError: err => {
      console.log(JSON.stringify(err, null, 1));
      return err;
    }
  });
  await createConnection();
  const app = express();

  app.use(cookieParser());
  app.use(async (req: any, res, next) => {
    const accessToken = req.cookies["access-token"];
    const refreshToken = req.cookies["refresh-token"];
    if (!accessToken && !refreshToken) {
      return next();
    }
    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);
    // some request may dont have access token, such as register
    try {
      const data = verify(accessToken, ACCESS_TOKEN_SECRET) as any;
      req.userId = data.userId;
      return next();
    } catch {}

    if (!refreshToken) {
      return next();
    }

    // refresh tokens
    let data;
    try {
      data = verify(refreshToken, REFRESH_TOKEN_SECRET) as any;
    } catch {
      console.log("refresh token not valid");
      return next();
    }
    const user = await User.findOne(data.userId);
    // token has been invalidated
    if (!user || user.count !== data.count) {
      console.log("count different");
      return next();
    }

    const tokens = createTokens(user);

    res.cookie("refresh-token", tokens.refreshToken);
    res.cookie("access-token", tokens.accessToken);
    req.userId = user.id;

    next();
  });
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
