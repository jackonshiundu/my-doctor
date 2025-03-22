import authDoctor from "../middlewares/auth.doctor";
import {
  doctorList,
  doctorLogin,
  appointmentDoctor,
  appointmentComplete,
} from "../controllers/doctor.controller";
import express from "express";
import { appointmentCancel } from "controllers/admin.controller";

const doctorRoute = express.Router();

doctorRoute.get("/list", doctorList);
doctorRoute.post("/login-doctor", doctorLogin);
doctorRoute.post("/doctor-appointment", authDoctor, appointmentDoctor);
doctorRoute.post("/appointment-complete", authDoctor, appointmentComplete);
doctorRoute.post("/appointment-cancel", authDoctor, appointmentCancel);

export default doctorRoute;
