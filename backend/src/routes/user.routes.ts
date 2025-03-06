import { register } from "../controllers/user.controller";
import express from "express";

const userRoutes = express.Router();

userRoutes.post("/register", register);

export default userRoutes;
