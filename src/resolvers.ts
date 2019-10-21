import { books, booksCreate, booksDelete, BookCreate, booksUpdate, Book } from './books';

interface BooksUpdateArgs {
  lastModified: string;
}

interface BooksCreateArgs {
  input: BookCreate;
}

interface BooksDeleteArgs {
  id: string;
}

interface BookGraphQL {
  author: string;
  created: string;
  id: string;
  isDeleted: boolean;
  lastModified: string;
  title: string;
}

const bookToGraphQL = (book: Book): BookGraphQL => {
  const createdStr = book.created.toString();
  const lastModifiedStr = book.lastModified.toString();
  const bookGraphQL = { ...book, created: createdStr, lastModified: lastModifiedStr };
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
    // eslint-disable-next-line
    booksDelete: (_: any, { id }: BooksDeleteArgs): BookGraphQL => {
      try {
        const book = booksDelete(id);
        const bookGraphQL = bookToGraphQL(book);
        return bookGraphQL;
      } catch (err) {
        throw new Error('404');
      }
    },
  },
};
