import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils";
import { Router } from "express";
import { RatedBookModel } from "../models/ratedBook";
import { v4 as uuid } from "uuid";

const router = Router();

router.post(
  "/signin",
  asyncHandler(async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).json({ message: "Invalid email or password" });
  })
);

router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    } as User);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

router.post(
  "/books/rate",
  asyncHandler(async (req, res) => {
    const response = req.body;
    let bookId = response.book.bookId;
    const userId = response.book._id;
    const rating = response.book.yourRating;
    console.log(bookId, userId, rating);
    console.log(req.body);
    if (bookId === "") {
      bookId = uuid();
    }

    try {
      const ratedBook = new RatedBookModel({
        user: userId,
        book: bookId,
        rating: rating,
      });

      await ratedBook.save();
      res.status(201).json({ message: "Book rated successfully" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  })
);

export default router;
