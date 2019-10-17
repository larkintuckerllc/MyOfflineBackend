import uuidv4 from 'uuid/v4';

export interface Book {
  author: string;
  id: string;
  isDeleted: boolean;
  lastModified: number;
  title: string;
}

export interface BookCreate {
  author: string;
  title: string;
}

const data = [
  {
    author: 'J.K. Rowling',
    id: '0',
    isDeleted: false,
    lastModified: 0,
    title: "Philosopher's Stone",
  },
  /*
  {
    author: 'J.K. Rowling',
    id: '1',
    isDeleted: false,
    lastModified: 0,
    title: 'Chamber of Secrets',
  },
  {
    author: 'J.K. Rowling',
    id: '2',
    isDeleted: false,
    lastModified: 0,
    title: 'The Prisoner of Azkaban',
  },
  {
    author: 'J.K. Rowling',
    id: '3',
    isDeleted: false,
    lastModified: 0,
    title: 'The Goblet of Fire',
  },
  {
    author: 'J.K. Rowling',
    id: '4',
    isDeleted: false,
    lastModified: 0,
    title: 'The Order of the Phoenix',
  },
  {
    author: 'J.K. Rowling',
    id: '5',
    isDeleted: false,
    lastModified: 0,
    title: 'The Half-Blood Prince',
  },
  {
    author: 'J.K. Rowling',
    id: '6',
    isDeleted: false,
    lastModified: 0,
    title: 'The Deathly Hallows',
  },
  */
] as Book[];

export const books = (): Book[] => data;

export const booksUpdate = (lastModified: number): Book[] =>
  data.filter(({ lastModified: bookLastModified }) => bookLastModified >= lastModified);

export const booksCreate = (bookCreate: BookCreate): Book => {
  const id = uuidv4();
  const lastModified = Date.now();
  const book = { ...bookCreate, id, isDeleted: false, lastModified };
  data.push(book);
  return book;
};
