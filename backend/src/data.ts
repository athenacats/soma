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
    isAdmin: true,
  },
];
