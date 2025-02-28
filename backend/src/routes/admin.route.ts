import express from "express";

import { addDoctor, loginAdmin } from "../controllers/admin.controller";
import upload from "../middlewares/multer";
import authAdmin from "../middlewares/auth.admin";

const adminRouter = express.Router();

adminRouter.post("/adddoctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login-admin", loginAdmin);

export default adminRouter;
