import { Request, Response } from "express";
import doctorModel from "../models/doctor.model";

const changeAvailablity = async (req: Request, res: Response) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    console.log(docData);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.status(200).json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { changeAvailablity };
