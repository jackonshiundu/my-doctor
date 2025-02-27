import mongoose, { ObjectId, Schema } from "mongoose";

export interface TheDoctor extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  speciality: string;
  degree: string;
  experiance: string;
  about: string;
  available: boolean;
  fee: number;
  Address: {
    line1: string;
    line2: string;
  };
  date: number;
  slots_booked: {
    slot_id: string;
    patient_id: string;
    date: string;
    time: string;
  }[];
}
const doctorSchema: Schema<TheDoctor> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experiance: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, required: true },
    fee: { type: Number, required: true },
    Address: { type: Object, required: true },
    date: { type: Number, required: true },
    slots_booked: [
      {
        slot_id: { type: String, required: true },
        patient_id: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
      },
    ],
  },
  { minimize: false }
);
const doctorModel = mongoose.model("doctor", doctorSchema);

export default doctorModel;
