import { createContext, useEffect, useState } from "react";
import { Doctor } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

type AppContectType = {
  doctors: Doctor[];
  currencySymbol: string;
  getAllDoctorsData: () => void;
  token: string;
  backendUrl: string;
  setToken: (newToken: string) => void;
};
const defaultContextValue: AppContectType = {
  doctors: [],
  getAllDoctorsData: () => {},
  backendUrl: "",
  currencySymbol: "",
  token: "",
  setToken: () => {},
};
export const AppContext = createContext<AppContectType>(defaultContextValue);

const AppContextProvider = (props: any) => {
  const currencySymbol: string = "Ksh.";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  const getAllDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const value = {
    currencySymbol,
    doctors,
    getAllDoctorsData,
    token,
    backendUrl,
    setToken,
  };
  useEffect(() => {
    getAllDoctorsData();
  }, []);
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
