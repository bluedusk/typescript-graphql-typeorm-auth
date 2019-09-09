import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { RouteComponentProps } from "react-router";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const LoginView = ({ history }: RouteComponentProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data }] = useMutation(LOGIN);

  return (
    <form className="box">
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            placeholder="email"
            type="text"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            placeholder="password"
            type="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <button
          className="button is-primary"
          onClick={async e => {
            e.preventDefault();
            const res = await login({ variables: { email, password } });
            console.log(res);
            history.push("/me");
          }}
        >
          login
        </button>
      </div>
    </form>
  );
};
