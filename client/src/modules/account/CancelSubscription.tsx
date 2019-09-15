import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import { userFragment } from "../../graphql/fragments/userFragment";

const cancelSubscriptionMutation = gql`
  mutation CancelSubscriptionMutation {
    cancelSubscription {
      ...UserInfo
    }
  }
  ${userFragment}
`;

export const CancelSubscription = () => {
  const [cancel] = useMutation(cancelSubscriptionMutation);
  return (
    <button
      className="button"
      onClick={() => {
        cancel();
      }}
    >
      Cancel Subscription
    </button>
  );
};
