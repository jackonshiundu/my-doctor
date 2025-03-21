import authDoctor from "../middlewares/auth.doctor";
import {
  doctorList,
  doctorLogin,
  appointmentDoctor,
} from "../controllers/doctor.controller";
import express from "express";

const doctorRoute = express.Router();

doctorRoute.get("/list", doctorList);
doctorRoute.post("/login-doctor", doctorLogin);
doctorRoute.get("/doctor-appointment", authDoctor, appointmentDoctor);

export default doctorRoute;
