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
  userData: any;
  setUserData: (userData: boolean) => void;
  loadUserData: () => void;
};
const defaultContextValue: AppContectType = {
  doctors: [],
  getAllDoctorsData: () => {},
  backendUrl: "",
  userData: {},
  currencySymbol: "",
  token: "",

  setToken: () => {},
  setUserData: () => {},
  loadUserData: () => {},
};
export const AppContext = createContext<AppContectType>(defaultContextValue);

const AppContextProvider = (props: any) => {
  const currencySymbol: string = "Ksh.";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  const [userData, setUserData] = useState(false);

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
  //function to get userData
  const loadUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/user/profile`, {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
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
    userData,
    setUserData,
    loadUserData,
  };
  useEffect(() => {
    getAllDoctorsData();
  }, []);
  useEffect(() => {
    if (token) {
      loadUserData();
    } else {
      setUserData(false);
    }
  }, [token]);
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
