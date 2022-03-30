import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type Query {
    user: User! # Must be of our custom type, User
  }

  type User {
    name: String!
    age: Int!
    friends: [String]!
  }
`;
