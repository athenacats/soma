import { Router } from "express";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/userModel";
import { sampleUsers } from "../data";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    await UserModel.deleteMany({});
    const createdUsers = await UserModel.insertMany(sampleUsers);
    res.json({ createdUsers });
  })
);

export default router;
