import { gql } from 'apollo-server-express';

export default gql`
  type Book {
    author: String!
    id: String!
    isDeleted: Boolean!
    lastModified: String!
    title: String!
  }

  input BooksCreateInput {
    author: String!
    title: String!
  }

  type Query {
    books: [Book]!
    booksUpdate(lastModified: String!): [Book]!
  }

  type Mutation {
    booksCreate(input: BooksCreateInput): Book
  }
`;
