import { Router } from "express";
import asyncHandler from "express-async-handler";
import { BookModel } from "../models/bookModel";
import { v4 as uuid } from "uuid";

const router = Router();

router.post(
  "/books/rate",
  asyncHandler(async (req, res) => {
    try {
      const {
        name,
        author,
        image,
        rating,
        favorite,
        isbn,
        pages,
        description,
        slugName,
        slugAuthor,
        yourRating,
      } = req.body;
      const numericRating = parseFloat(rating);
      const numericPages = parseFloat(pages);
      const book = await BookModel.create({
        name,
        author,
        image,
        rating: numericRating,
        favorite,
        isbn,
        yourRating,
        pages: numericPages,
        description,
        slugName,
        slugAuthor,
        _id: uuid(),
      });

      res.json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

export default router;
