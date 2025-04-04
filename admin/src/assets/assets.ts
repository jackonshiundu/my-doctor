import add_icon from "./add_icon.svg";
import admin_logo from "./admin_logo.svg";
import appointment_icon from "./appointment_icon.svg";
import cancel_icon from "./cancel_icon.svg";
import doctor_icon from "./doctor_icon.svg";
import home_icon from "./home_icon.svg";
import people_icon from "./people_icon.svg";
import upload_area from "./upload_area.svg";
import list_icon from "./list_icon.svg";
import tick_icon from "./tick_icon.svg";
import appointments_icon from "./appointments_icon.svg";
import earning_icon from "./earning_icon.svg";
import patients_icon from "./patients_icon.svg";

export const assets = {
  add_icon,
  admin_logo,
  appointment_icon,
  cancel_icon,
  doctor_icon,
  upload_area,
  home_icon,
  patients_icon,
  people_icon,
  list_icon,
  tick_icon,
  appointments_icon,
  earning_icon,
};

interface Address {
  line1: string;
  line2: string;
}

// Define the type for a doctor object
export interface Doctor {
  _id: string;
  name: string;
  image: string;
  speciality: string;
  degree: string;
  experience: string;
  about: string;
  available: boolean;
  fee: number;
  Address: Address;
}

export interface TheAppointment {
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

//function to calculate the age
export const calculateAge = (dob: string) => {
  const today = new Date();
  const birthDate = new Date(dob);

  let Age = today.getFullYear() - birthDate.getFullYear();

  return Age;
};

//function to get the date format
const months = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const slotDateFormat = (slotDate: string): string => {
  const dateArray = slotDate.split("_");
  return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
};
