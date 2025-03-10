import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

//admin's authentication middleware

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.headers;
    if (!token || Array.isArray(token)) {
      res.status(400).json({
        success: false,
        message: "Not authorised , Login",
      });
      return;
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decodedToken === "string" || !("id" in decodedToken)) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    req.body.userId = decodedToken.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
    return;
  }
};
export default authUser;
