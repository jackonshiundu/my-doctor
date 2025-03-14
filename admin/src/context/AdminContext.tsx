import axios from "axios";
import { createContext, useState } from "react";
import { Doctor } from "../assets/assets";
import toast from "react-hot-toast";

type AdminContextType = {
  aToken: String | null;
  setAToken: (token: string | null) => void;
  changeAvailability: (docId: string) => void;
  getAllDoctors: () => void;
  backendUrl: String;
  doctors: Doctor[];
};
const initialAdminContet = {
  aToken: "",
  setAToken: () => {},
  getAllDoctors: () => {},
  changeAvailability: () => {},
  backendUrl: "",
  doctors: [],
};
export const AdminContext = createContext<AdminContextType>(initialAdminContet);

const AdminContextProvider = (props: any) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  //creatign the doctors state
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  //settin the back end URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  //function to gegt all doctors
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/admin/all-doctors`,

        { headers: { aToken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message); // Access error.message safely
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  const changeAvailability = async (docId: string) => {
    try {
      const { data } = await axios.patch(
        `${backendUrl}/api/v1/admin/change-availability`,
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    changeAvailability,
    getAllDoctors,
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
