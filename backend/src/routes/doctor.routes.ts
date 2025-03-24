import authDoctor from "../middlewares/auth.doctor";
import {
  doctorList,
  doctorLogin,
  appointmentDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
} from "../controllers/doctor.controller";
import express from "express";

const doctorRoute = express.Router();

doctorRoute.get("/list", doctorList);
doctorRoute.post("/login-doctor", doctorLogin);
doctorRoute.post("/doctor-appointment", authDoctor, appointmentDoctor);
doctorRoute.post("/appointment-complete", authDoctor, appointmentComplete);
doctorRoute.post("/appointment-cancel", authDoctor, appointmentCancel);
doctorRoute.post("/doctor-dashboard", authDoctor, doctorDashboard);

export default doctorRoute;
