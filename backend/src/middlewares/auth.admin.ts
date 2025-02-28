import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

//admin's authentication middleware

const authAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { atoken } = req.headers;
    if (!atoken || Array.isArray(atoken)) {
      res.status(400).json({
        success: false,
        message: "Not authorised",
      });
      return;
    }
    const decodedToken = jwt.verify(atoken, process.env.JWT_SECRET);
    if (decodedToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      res.status(400).json({
        success: false,
        message: "Not valid token",
      });
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export default authAdmin;
