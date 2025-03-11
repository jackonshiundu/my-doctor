import { defaultImage } from "../config/data";
import mongoose, { Schema } from "mongoose";

export interface TheAppointment extends Document {
  _id: string;
  userId: string;
  docId: string;
  slotDate: string;
  slotTime: string;
  userData: object;
  docData: object;
  amount: number;
  date: number;
  canceled: boolean;
  payment: boolean;
  isCompleted: boolean;
}

const appointmentSchema = new Schema({
  userId: { type: String, required: true },
  docId: { type: String, required: true },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  userData: { type: Object, required: true },
  docData: { type: Object, required: true },
  amount: { type: Number, required: true },
  date: { type: Number, required: true },
  canceled: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
});

const appointmentModel = mongoose.model("appointment", appointmentSchema);

export default appointmentModel;
