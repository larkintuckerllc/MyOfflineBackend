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
    id: String!
    title: String!
  }

  input BooksPageInput {
    offset: Int!
    first: Int!
  }

  type Query {
    books: [Book]!
    booksUpdate(lastModified: String!): [Book]!
    booksPage(input: BooksPageInput!): [Book]!
  }

  type Mutation {
    booksCreate(input: BooksCreateInput!): Book
    booksDelete(id: String!): Book
  }
`;
