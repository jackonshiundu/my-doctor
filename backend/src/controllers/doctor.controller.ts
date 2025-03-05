import { Request, Response } from "express";
import doctorModel from "../models/doctor.model";

const chnageAvailablity = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const docData = await doctorModel.findById(id);
    await doctorModel.findByIdAndUpdate(id, { available: !docData.available });
    res.status(200).json({ seccess: true, message: "Availability Chnaged" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { chnageAvailablity };
