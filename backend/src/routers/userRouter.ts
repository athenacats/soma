import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils";
import { Router } from "express";
import { RatedBookModel } from "../models/ratedBook";

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
    const name = book.name;
    const userId = response.user._id;
    const rating = response.yourRating;
    console.log(response);
    try {
      const existingRating = await RatedBookModel.findOne({
        userId: userId,
        "book.name": name,
      });

      if (existingRating) {
        existingRating.rating = rating;
        await existingRating.save();
        res.send(existingRating);
      } else {
        const ratedBook = new RatedBookModel({
          userId: userId,
          rating: rating,
          book: book,
        });
        await ratedBook.save();
        console.log(ratedBook);
        res.send(ratedBook);

        // res.status(201).json({ message: "Book rated successfully" });
      }
    } catch (error) {
      console.log(error);
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
    console.log(userRatings);
    try {
      res.send(userRatings);
    } catch (error) {
      console.log(error);
    }
  })
);

export default router;
