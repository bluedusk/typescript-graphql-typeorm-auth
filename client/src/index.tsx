import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import "bulma/css/bulma.css";
import { Routes } from "./Routes";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include" // to use cookie
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById("root")
);
