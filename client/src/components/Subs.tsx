import { gql, useSubscription } from "@apollo/client";

const COMMENTS_SUBSCRIPTION = gql`
  subscription {
    listen(topic: "hello") {
      relatedNodeId
      relatedNode {
        nodeId
        ... on Post {
          postId
          title
          createdDate
          body
        }
      }
    }
  }
`;

export const Subs = (): any => {
  const { data, loading } = useSubscription(COMMENTS_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log("theSubData_>>", JSON.stringify(subscriptionData));
    },
  });
  return (
    <div>
      <h4>New comment: {!loading && data.listen.relatedNode.body}</h4>
      <p>something</p>
    </div>
  );
};
