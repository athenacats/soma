import { Book } from "./models/bookModel";
import { User } from "./models/userModel";
import bcrypt from "bcryptjs";

export const sampleUsers: User[] = [
  {
    name: "Angel",
    email: "admin@example.com",
    password: bcrypt.hashSync("12345"),
    isAdmin: true,
  },
  {
    name: "Albert",
    email: "user@example.com",
    password: bcrypt.hashSync("67890"),
    isAdmin: false,
  },
];

export const sampleBooks: Book[] = [
  {
    name: "Harry Potter and the Philosopher's Stone",
    image: `https://covers.openlibrary.org/b/id/10521270-L.jpg`,
    author: "J. K. Rowling",
    rating: 4.272269,
    favorite: true,
    isbn: "0747542988",
    yourRating: 4,
    pages: 303,
    description: "",
    slugName: "harry-potter-and-the-philosophers-stone",
    slugAuthor: "j-k-rowling",
  },
  {
    name: "Harry Potter and the Deathly Hallows",
    image: `https://covers.openlibrary.org/b/id/10110415-L.jpg`,
    author: "J. K. Rowling",
    rating: 4.2833877,
    favorite: false,
    isbn: "1526618354",
    yourRating: 5,
    pages: 695,
    description: "",
    slugName: "harry-potter-and-the-deathly-hallows",
    slugAuthor: "j-k-rowling",
  },
];
