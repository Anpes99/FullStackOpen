const { v1: uuid } = require("uuid");

let { authors, books } = require("../utils/data");

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => {
      const reducer = (acc, curr) => {
        const author = acc.includes(curr.author);
        if (author) {
          return acc;
        } else acc = acc.concat(curr.author);
        return acc;
      };

      const listOfAuthors = books.reduce(reducer, []);
      return listOfAuthors.length;
    },
    allBooks: (root, args) => {
      if (!args.genre) {
        if (args.author) return books.filter((b) => b.author === args.author);
        else return books;
      } else if (args.genre) {
        if (args.author)
          return books.filter(
            (b) => b.author === args.author && b.genres.includes(args.genre)
          );
        else return books.filter((b) => b.genres.includes(args.genre));
      }
    },
    allAuthors: () => authors,
  },
  Author: {
    bookCount: (root) => {
      const bookcount = books.reduce((acc, curr) => {
        if (curr.author === root.name) {
          return (acc += 1);
        } else return acc;
      }, 0);
      return bookcount;
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() };
      books = books.concat(book);
      if (!authors.find((a) => a.name === args.author)) {
        authors = authors.concat({ name: args.author, id: uuid() });
      }
      return book;
    },
    editAuthor: (root, args) => {
      const index = authors.findIndex((a) => a.name === args.name);
      if (authors[index]) {
        authors[index].born = args.setBornTo;
        return authors[index];
      }
      return null;
    },
  },
};

module.exports = resolvers;
