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
  completeAppointment: (appointmentId: string) => void;
  cancelAppointment: (appointmentId: string) => void;
  dashData: any;
  setDashData: (docData: any) => void;
  getDashData: () => void;
}
const initialDoctorContext = {
  backendUrl: "",
  dToken: "",
  setDToken: () => {},
  appointments: [],
  setAppointments: () => {},
  getAppointments: () => {},
  completeAppointment: () => {},
  cancelAppointment: () => {},
  dashData: false,
  setDashData: () => {},
  getDashData: () => {},
};
export const DoctorContext = createContext<DoctorContext>(initialDoctorContext);

const DoctorContextProvider = (props: any) => {
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : null
  );
  const [appointments, setAppointments] = useState<TheAppointment[]>([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dashData, setDashData] = useState(false);
  //getting appointments data
  const getAppointments = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/doctor/doctor-appointment`,
        { dToken }
        /*         { headers: { dToken } }
         */
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
  //marking appointment completes
  const completeAppointment = async (appointmentId: string) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/doctor/appointment-complete`,
        { appointmentId, dToken },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  //cancelling appointment
  const cancelAppointment = async (appointmentId: string) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/doctor/appointment-cancel`,
        { appointmentId, dToken },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  //getting the DashData
  const getDashData = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/doctor/doctor-dashboard`,
        {
          dToken,
        }
      );
      if (data.success) {
        setDashData(data.dashBoardData);
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
    completeAppointment,
    cancelAppointment,
    dashData,
    setDashData,
    getDashData,
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
