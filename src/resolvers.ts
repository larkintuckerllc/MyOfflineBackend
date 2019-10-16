import { books, booksCreate, BookCreate, booksUpdate, Book } from './books';

interface BooksUpdateArgs {
  lastModified: string;
}

interface BooksCreateArgs {
  input: BookCreate;
}

interface BookGraphQL {
  author: string;
  id: string;
  isDeleted: boolean;
  lastModified: string;
  title: string;
}

const bookToGraphQL = (book: Book): BookGraphQL => {
  const lastModifiedStr = book.lastModified.toString();
  const bookGraphQL = { ...book, lastModified: lastModifiedStr };
  return bookGraphQL;
};

export default {
  Query: {
    books: (): BookGraphQL[] => books().map(bookToGraphQL),

    booksUpdate: (obj: {}, { lastModified: lastModifiedStr }: BooksUpdateArgs): BookGraphQL[] => {
      const lastModified = Number.parseInt(lastModifiedStr, 10);
      if (Number.isNaN(lastModified) || lastModified < 0) {
        throw new Error('400');
      }
      return booksUpdate(lastModified).map(bookToGraphQL);
    },
  },
  Mutation: {
    // eslint-disable-next-line
    booksCreate: (_: any, { input }: BooksCreateArgs): BookGraphQL => {
      const book = booksCreate(input);
      const bookGraphQL = bookToGraphQL(book);
      return bookGraphQL;
    },
  },
};
