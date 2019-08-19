import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

export const RegisterView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register, { data }] = useMutation(REGISTER);

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div>
        <input
          placeholder="email"
          type="text"
          value={email}
          onChange={e => {
            console.log(e.target.value);
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <button
        onClick={async () => {
          await register({ variables: { email, password } });
          console.log(data);
        }}
      >
        register
      </button>
    </form>
  );
};
