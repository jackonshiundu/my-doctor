//api to register users

import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      res
        .status(404)
        .json({ success: false, message: "Please provide all the Details" });
    }
    //validating email format
    if (!validator.isEmail(email)) {
      res.status(400).json({
        success: false,
        message: "Enter a valid Email",
      });
    }
    //validating a strong password
    if (password.length < 8) {
      res.status(404).json({
        success: false,
        message: "Please use a strong pasword.",
      });
    }
    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { register };
