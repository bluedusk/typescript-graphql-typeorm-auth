import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { RouteComponentProps } from "react-router";
import { meQuery } from "../../graphql/queries/me";
import { userFragment } from "../../graphql/fragments/userFragment";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...UserInfo
    }
  }
  ${userFragment}
`;

export const LoginView = ({ history }: RouteComponentProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { client }] = useMutation(LOGIN, {
    update: (cache, { data }) => {
      if (!data || !data.login) {
        return null;
      }
      cache.writeQuery({
        query: meQuery,
        data: {
          me: data.login
        }
      });
    }
  });

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
            // optional reset
            client && (await client.resetStore());
            const res = await login({ variables: { email, password } });
            history.push("/account");
          }}
        >
          login
        </button>
      </div>
    </form>
  );
};
