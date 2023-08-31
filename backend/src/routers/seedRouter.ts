import { Router } from "express";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/userModel";
import { sampleBooks, sampleUsers } from "../data";
import { BookModel } from "../models/bookModel";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    await UserModel.deleteMany({});
    const createdUsers = await UserModel.insertMany(sampleUsers);
    res.json({ createdUsers });
  })
);

router.get(
  "/seedbooks",
  asyncHandler(async (req, res) => {
    await BookModel.deleteMany({});
    const createdBooks = await BookModel.insertMany(sampleBooks);
    res.json(createdBooks);
  })
);

export default router;
