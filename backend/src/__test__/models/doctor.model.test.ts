import dotenv from "dotenv";
import doctorModel, { TheDoctor } from "../../models/doctor.model";
import mongoose from "mongoose";

dotenv.config();
describe("Doctors Models Tests", () => {
  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URI environment variable is not defined/set");
    }
    mongoose.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  //testing create a doctor
  it("Should create A doctor", async () => {
    const doctorData: Partial<Omit<TheDoctor, "_id">> = {
      name: "John Doe",
      email: "john@gmail.com",
      password: "john1234",
      image: "john.png",
      speciality: "Cadio",
      degree: "MMBS",
      experiance: "4 Years",
      about: "A very Sl=kiiled doctor with over 4 years of experiance",
      available: true,
      fee: 40000,
      date: 3 / 28 / 2025,
      Address: {
        line1: "Nairobi",
        line2: "Uthiru",
      },
    };
    const createdDoctor = await doctorModel.create(doctorData);
    expect(createdDoctor.name).toBe(doctorData.name);
  }, 80000);
});
