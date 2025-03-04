import express from "express";

import {
  addDoctor,
  getAllDoctors,
  loginAdmin,
} from "../controllers/admin.controller";
import upload from "../middlewares/multer";
import authAdmin from "../middlewares/auth.admin";

const adminRouter = express.Router();

adminRouter.post("/adddoctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login-admin", loginAdmin);
adminRouter.get("/all-doctors", authAdmin, getAllDoctors);

export default adminRouter;
