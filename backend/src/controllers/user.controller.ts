//api to register users

import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctor.model";
import appointmentModel from "../models/appointment.model";
const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      res
        .status(404)
        .json({ success: false, message: "Please provide all the Details" });
    }
    //validating email format
    if (!validator.isEmail(email)) {
      res.status(400).json({
        success: false,
        message: "Enter a valid Email",
      });
    }
    //validating a strong password
    if (password.length < 8) {
      res.status(404).json({
        success: false,
        message: "Please use a strong pasword.",
      });
    }
    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for user Login
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User Does not Exists.",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).json({ success: true, token });
    } else {
      res.json({ success: false, message: "Wrong password." });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API to get user profile data
const getProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.status(200).json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API to update users data
const updateProfile = async (req: Request, res: Response) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    // Check if userId is provided
    if (!userId) {
      res.status(400).json({ success: false, message: "User ID is required" });
      return;
    }

    // Create an object to hold the fields that need to be updated
    const updateFields: any = {};

    if (name) updateFields.name = name;
    if (phone) updateFields.phone = phone;

    // Handle address parsing
    if (address) {
      try {
        // Check if address is already an object
        if (typeof address === "object") {
          updateFields.Address = address;
        } else {
          // Parse address if it's a JSON string
          updateFields.Address = JSON.parse(address);
        }
      } catch (error) {
        console.error("Error parsing address:", error);
        res
          .status(400)
          .json({ success: false, message: "Invalid address format" });
        return;
      }
    }

    if (dob) updateFields.dob = dob;
    if (gender) updateFields.gender = gender;

    // Update the user profile with the provided fields
    await userModel.findByIdAndUpdate(userId, updateFields);

    // Handle image upload if an image file is provided
    if (imageFile) {
      // Upload image to Cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      // Update the user's image URL in the database
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.status(200).json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//API to book Appointment

const bookAppointment = async (req: Request, res: Response) => {
  try {
    const { userId, docId, slotDate, slotTime, amount, date } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");
    console.log(docData);
    if (docData && !docData.available) {
      res.json({ success: false, message: "Doctor not available" });
      return;
    }
    let slots_booked = docData.slots_booked;
    //checking for slots availablity
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        res.json({ success: false, message: "Slot not available" });
        return;
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fee,
      slotTime,
      slotDate,
      date: Date.now(),
    };
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();
    //save new slots data in doctor's data
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.status(200).json({ success: true, message: "Appointment booked" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export { register, loginUser, getProfile, updateProfile, bookAppointment };
