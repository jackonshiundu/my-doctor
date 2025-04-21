import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Define your Doctor interface (should be in a types file)
interface Doctor {
  id: string;
  name: string;
  speciality: string;
  fee: number;
  image: string;
  // Add other Doctor properties as needed
}

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  Address: {
    line1: string;
    line2: string;
  };
  gender: string;
  dob: string;
  // Add other user properties as needed
}

interface AppContextType {
  doctors: Doctor[];
  currencySymbol: string;
  getAllDoctorsData: () => Promise<void>;
  token: string;
  backendUrl: string;
  setToken: (newToken: string) => void;
  userData: UserData | null;
  setUserData: (userData: UserData | null) => void;
  loadUserData: () => Promise<void>;
}

const defaultContextValue: AppContextType = {
  doctors: [],
  currencySymbol: "",
  getAllDoctorsData: async () => {},
  token: "",
  backendUrl: "",
  setToken: () => {},
  userData: null,
  setUserData: () => {},
  loadUserData: async () => {},
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const currencySymbol = "Ksh.";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  const [userData, setUserData] = useState<UserData | null>(null);

  const getAllDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const loadUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/user/profile`, {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
        setUserData(null);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
      setUserData(null);
    }
  };

  const handleSetToken = (newToken: string) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  const value = {
    currencySymbol,
    doctors,
    getAllDoctorsData,
    token,
    backendUrl,
    setToken: handleSetToken,
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
      setUserData(null);
    }
  }, [token]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
