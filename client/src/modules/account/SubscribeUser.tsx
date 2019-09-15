import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  CreateSubscriptionMutation,
  CreateSubscriptionMutationVariables
} from "./__generated__/CreateSubscriptionMutation";
import { userFragment } from "../../graphql/fragments/userFragment";

const CREATE_SUBSCRIPTION_MUTATION = gql`
  mutation CreateSubscriptionMutation($source: String!, $ccLast4: String!) {
    createSubscription(source: $source, ccLast4: $ccLast4) {
      ...UserInfo
    }
  }
  ${userFragment}
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
            source: token.id,
            ccLast4: token.card.last4
          }
        });
        console.log(response);
      }}
      amount={100}
      stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE!}
    />
  );
};
