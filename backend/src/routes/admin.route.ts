import express from "express";

import {
  addDoctor,
  getAllDoctors,
  loginAdmin,
} from "../controllers/admin.controller";
import upload from "../middlewares/multer";
import authAdmin from "../middlewares/auth.admin";
import { chnageAvailablity } from "controllers/doctor.controller";

const adminRouter = express.Router();

adminRouter.post("/adddoctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login-admin", loginAdmin);
adminRouter.get("/all-doctors", authAdmin, getAllDoctors);
adminRouter.patch("/change-availability", authAdmin, chnageAvailablity);

export default adminRouter;
