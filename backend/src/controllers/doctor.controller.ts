import { Request, Response } from "express";
import doctorModel from "../models/doctor.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointment.model";
const changeAvailablity = async (req: Request, res: Response) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.status(200).json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req: Request, res: Response) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API to login Doctor
const doctorLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return;
    }
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      res.json({
        success: false,
        message: "Doctor with that email Not Available",
      });
      return;
    }

    const isPassowrdCorrect = await bcrypt.compare(password, doctor.password);
    if (!isPassowrdCorrect) {
      res.json({
        success: false,
        message: "The password Doesn't match",
      });
      return;
    }
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API to  get doctor appointments for doctor panel
const appointmentDoctor = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.body;
    const appointments = await appointmentModel.find({ docId: doctorId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API to mark Appointment completed for doctor panel

const appointmentComplete = async (req: Request, res: Response) => {
  try {
    const { doctorId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId == doctorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      res.json({ success: true, message: "Appointment updated" });
      return;
    } else {
      res.json({ success: false, message: "Failed " });
      return;
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const appointmentCancel = async (req: Request, res: Response) => {
  try {
    const { doctorId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId == doctorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        canceled: true,
      });
      res.json({ success: true, message: "Appointment updated" });
      return;
    } else {
      res.json({ success: false, message: "Failed to Cancel " });
      return;
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//Api to get dahboard Data for Doctor Panel
const doctorDashboard = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.body;
    const appointments = await appointmentModel.find({ docId: doctorId });
    let earnings = 0;
    appointments.map((appointment) => {
      if (appointment.isCompleted || appointment.payment) {
        earnings += appointment.amount;
      }
    });
    let patients: string[] = [];
    appointments.map((appointment) => {
      if (!patients.includes(appointment.userId)) {
        patients.push(appointment.userId);
      }
    });
    const dashBoardData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashBoardData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API to get doctor Profile fo doctor panel

const doctorProfile = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.body;
    const profileData = await doctorModel
      .findById(doctorId)
      .select("-password");

    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API to update DOctor profile from doctor panel
const updateDoctorProfile = async (req: Request, res: Response) => {
  try {
    const { doctorId, fee, Address, available } = req.body;
    await doctorModel.findByIdAndUpdate(doctorId, { fee, Address, available });
    res.json({ success: true, message: "Profile Updated." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export {
  changeAvailablity,
  doctorList,
  doctorLogin,
  appointmentDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
