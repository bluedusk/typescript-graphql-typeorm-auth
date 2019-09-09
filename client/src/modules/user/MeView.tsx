import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { MeQuery } from "./__generated__/MeQuery";

const meQuery = gql`
  query MeQuery {
    me {
      id
      email
    }
  }
`;

export const MeView = () => {
  const { data, loading } = useQuery<MeQuery>(meQuery);
  console.log(data);

  if (loading) {
    return null;
  }
  if (!data) {
    return <div>data is undefined</div>;
  }

  if (!data.me) {
    return <div>received no user</div>;
  }
  return <div>{data.me.email}</div>;
};
