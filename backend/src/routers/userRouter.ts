import asyncHandler from "express-async-handler";
import { UserModel } from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils";
import { Router } from "express";

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
