import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { TheAppointment } from "../assets/assets";

interface DoctorContext {
  backendUrl: string;
  dToken: string | null;
  setDToken: (aToken: string | null) => void;
  appointments: TheAppointment[];
  setAppointments: (appointments: TheAppointment[]) => void;
  getAppointments: () => void;
}
const initialDoctorContext = {
  backendUrl: "",
  dToken: "",
  setDToken: () => {},
  appointments: [],
  setAppointments: () => {},
  getAppointments: () => {},
};
export const DoctorContext = createContext<DoctorContext>(initialDoctorContext);

const DoctorContextProvider = (props: any) => {
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : null
  );
  const [appointments, setAppointments] = useState<TheAppointment[]>([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  //getting appointments data
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/doctor/doctor-appointment`,
        { headers: { dToken } }
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const value = {
    backendUrl,
    dToken,
    setDToken,
    appointments,
    setAppointments,
    getAppointments,
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
