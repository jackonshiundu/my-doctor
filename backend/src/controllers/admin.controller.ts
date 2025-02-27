import { Request, Response } from "express";

const addDoctor = async (req: Request, res: Response) => {
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
      Address,
      date,
    } = req.body;
    const imageFile = req.file;
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
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }
  } catch (error) {}
};

export { addDoctor };
