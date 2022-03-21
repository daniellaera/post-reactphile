import { useQuery, gql } from "@apollo/client";

const FEED_QUERY = gql`
  query GetPosts {
    allPosts {
      nodes {
        nodeId
        id
        title
        body
        createdDate
        authorId
      }
    }
  }
`;

export const Link = () => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
      {data && (
        <>
          {data.allPosts.nodes.map((post) => (
            <p key={post.id}>
              {post.id} - {post.title}
            </p>
          ))}
        </>
      )}
    </div>
  );
};
