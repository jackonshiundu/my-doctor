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
    const appointments = await appointmentModel.find({ doctorId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export { changeAvailablity, doctorList, doctorLogin, appointmentDoctor };
