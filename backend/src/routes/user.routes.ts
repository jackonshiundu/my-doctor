import { loginUser, register } from "../controllers/user.controller";
import express from "express";

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", loginUser);

export default userRoutes;
