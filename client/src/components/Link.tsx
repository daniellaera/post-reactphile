import { useQuery, gql, useMutation } from "@apollo/client";

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

const ADD_TODO = gql`
  mutation CreatePost($title: String!, $body: String!, $authorId: Int!) {
    createPost(
      input: { post: { title: $title, body: $body, authorId: $authorId } }
    ) {
      post {
        title
        body
      }
    }
  }
`;

export const Link = (): any => {
  // const { data } = useQuery(FEED_QUERY);
  let title: any;
  let body: any;
  const [addTodo, { data, loading, error }] = useMutation(ADD_TODO);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <>
      {/*  <div>
        {data && (
          <>
            {data.allPosts.nodes.map((post) => (
              <p key={post.id}>
                {post.id} - {post.title}
              </p>
            ))}
          </>
        )}
      </div> */}
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo({
              variables: {
                body: body.value,
                title: title.value,
                authorId: 2,
              },
            });
            title.value = "";
            body.value = "";
          }}
        >
          <input
            ref={(node) => {
              title = node;
            }}
          />
          <input
            ref={(node) => {
              body = node;
            }}
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    </>
  );
};
