import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  CreateSubscriptionMutation,
  CreateSubscriptionMutationVariables
} from "./__generated__/CreateSubscriptionMutation";

const CREATE_SUBSCRIPTION_MUTATION = gql`
  mutation CreateSubscriptionMutation($source: String!) {
    createSubscription(source: $source) {
      id
      email
    }
  }
`;
export const SubscribeUser = () => {
  const [createSubscription, { data, loading }] = useMutation<
    CreateSubscriptionMutation,
    CreateSubscriptionMutationVariables
  >(CREATE_SUBSCRIPTION_MUTATION);
  return (
    <StripeCheckout
      token={async token => {
        console.log(token);
        const response = await createSubscription({
          variables: {
            source: token.id
          }
        });
        console.log(response);
      }}
      stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE!}
    />
  );
};
