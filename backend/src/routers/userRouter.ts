import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils";
import { Router } from "express";
import { RatedBookModel } from "../models/ratedBook";
import { v4 as uuid } from "uuid";
import { BookModel } from "../models/bookModel";

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
    const book = response.book;
    let bookId = response.book.bookId;
    const userId = response.user._id;
    const rating = response.book.yourRating;
    console.log(bookId, userId, rating);
    console.log(req.body);

    try {
      const existingRating = await RatedBookModel.findOne({
        user: userId,
        book: bookId,
      });

      if (existingRating) {
        existingRating.rating = rating;
        await existingRating.save();
      } else {
        bookId = uuid();
        const ratedBook = new RatedBookModel({
          user: userId,
          bookid: bookId,
          rating: rating,
          newBook: book,
        });

        await ratedBook.save();
        res.status(201).json({ message: "Book rated successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  })
);

router.post(
  "/signout",
  asyncHandler(async (req, res) => {
    try {
      await BookModel.updateMany({ yourRating: 0, bookId: "" });
      res.status(200).json({ message: "User signed out successfully" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred during sign-out" });
    }
  })
);

router.get(
  "/profile/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    const userRatings = await RatedBookModel.find({ userId: userId });

    try {
      res.send(userRatings);
    } catch (error) {
      console.log(error);
    }
  })
);

export default router;
