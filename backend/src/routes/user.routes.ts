import authUser from "../middlewares/auth.user";
import {
  getProfile,
  loginUser,
  register,
  updateProfile,
} from "../controllers/user.controller";
import express from "express";
import upload from "../middlewares/multer";

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", loginUser);
userRoutes.get("/profile", authUser, getProfile);
userRoutes.patch(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);

export default userRoutes;
