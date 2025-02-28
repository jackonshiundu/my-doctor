import express from "express";

import { addDoctor, loginAdmin } from "../controllers/admin.controller";
import upload from "../middlewares/multer";

const adminRouter = express.Router();

adminRouter.post("/adddoctor", upload.single("image"), addDoctor);
adminRouter.post("/login-admin", loginAdmin);

export default adminRouter;
