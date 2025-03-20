import { Request, Response } from "express";
import validator from "validator";
import multer from "multer";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
const upload = multer({ dest: "uploads/" });
import doctorModel from "../models/doctor.model";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointment.model";
import userModel from "../models/user.model";
const addDoctor = async (
  req: Request,
  res: Response<any, Record<string, any>>
): Promise<void> => {
  try {
    const {
      name,
      email,
      password,
      image,
      speciality,
      degree,
      experiance,
      about,
      available,
      fee,
      phone,
      Address,
      date,
    } = req.body;
    const imageFile = req.file;
    //checking doctor credentails
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experiance ||
      !about ||
      !fee ||
      !Address
    ) {
      return void res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }
    //validating the email
    if (!validator.isEmail(email)) {
      return void res
        .status(400)
        .json({ success: false, message: "Please Enter a valid email" });
    }
    //validating password-to basically have a srong password
    if (password.length < 8) {
      return void res
        .status(400)
        .json({ success: false, message: "Please Enter a Strong password" });
    }

    //hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //uploadign image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experiance,
      about,
      fee,
      phone,
      available: true,
      Address: JSON.parse(Address),
      date: Date.now(),
    };
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    res
      .status(200)
      .json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api for ad,in login
const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);

      res.status(200).json({ success: true, token });
    } else {
      res.status(400).json({ success: false, message: "Invalid Credentails" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Api to get all doctors List for teh admin's panel
const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API to get Apoitnment list
const appointmentsAdmin = async (req: Request, res: Response) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API for appointment Cancelation

const appointmentCancel = async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      canceled: true,
    });

    //release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e: any) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Canceled." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//API to get Dahboard Data for admin panel

const adminDashboard = async (req: Request, res: Response) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});
    const dashData = {
      doctors: doctors.length,
      patients: users.length,
      appointments: appointments.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export {
  addDoctor,
  loginAdmin,
  getAllDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
};
