import { doctorList, doctorLogin } from "../controllers/doctor.controller";
import express from "express";

const doctorRoute = express.Router();

doctorRoute.get("/list", doctorList);
doctorRoute.post("/login-doctor", doctorLogin);

export default doctorRoute;
