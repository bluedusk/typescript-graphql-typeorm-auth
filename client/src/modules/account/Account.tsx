import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { MeQuery } from "../../graphql/queries/__generated__/MeQuery";
import { Redirect } from "react-router-dom";
import { SubscribeUser } from "./SubscribeUser";
import { meQuery } from "../../graphql/queries/me";
import { ChangeCreditCard } from "./ChangeCreditCard";
import { CancelSubscription } from "./CancelSubscription";

export const Account = () => {
  const { data, loading } = useQuery<MeQuery>(meQuery);
  console.log(data);
  if (loading) {
    return <div>loading</div>;
  }
  if (!data) {
    return <div>data is undefined</div>;
  }

  if (!data.me) {
    return <Redirect to="/login" />;
  }

  if (data.me.type === "free-trial") {
    return <SubscribeUser />;
  }
  return (
    <div>
      <div>your current last 4 digits is {data.me.ccLast4}</div>
      <ChangeCreditCard />
      <CancelSubscription />
    </div>
  );
};
