import { defaultImage } from "../config/data";
import mongoose, { Schema } from "mongoose";

export interface TheUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  Address: {
    line1: string;
    line2: string;
  };
  gender: string;
  dob: string;
  phone: string;
}

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true, default: defaultImage },
  Address: {
    type: Object,
    required: true,
    default: {
      line1: "",
      line2: "",
    },
  },
  gender: { type: String, default: "Not Selected" },
  dob: { type: String, defult: "Not Selected" },
  phone: { type: String, defult: "0000000000" },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
