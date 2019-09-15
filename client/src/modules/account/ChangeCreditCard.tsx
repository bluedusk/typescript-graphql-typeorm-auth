import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  ChangeCreditCardMutationVariables,
  ChangeCreditCardMutation
} from "./__generated__/ChangeCreditCardMutation";
import { userFragment } from "../../graphql/fragments/userFragment";

const CHANGE_CREDIT_CARD_MUTATION = gql`
  mutation ChangeCreditCardMutation($source: String!, $ccLast4: String!) {
    changeCreditCard(source: $source, ccLast4: $ccLast4) {
      ...UserInfo
    }
  }
  ${userFragment}
`;
export const ChangeCreditCard = () => {
  const [changeCreditCard, { data, loading }] = useMutation<
    ChangeCreditCardMutation,
    ChangeCreditCardMutationVariables
  >(CHANGE_CREDIT_CARD_MUTATION);
  return (
    <StripeCheckout
      token={async token => {
        console.log(token);
        const response = await changeCreditCard({
          variables: {
            source: token.id,
            ccLast4: token.card.last4
          }
        });
        console.log(response);
      }}
      panelLabel="Change Credit Card"
      stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE!}
    >
      <button className="button">Change Credit Card</button>
    </StripeCheckout>
  );
};
