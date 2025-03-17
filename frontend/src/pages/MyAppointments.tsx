import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, TheAppointment } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState<TheAppointment[]>([]);
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/user/list-appointment`,
        { headers: { token } }
      );
      console.log(data);
      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);
  return (
    <div>
      <p className="pb-3 mt-32 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div>
        {appointments &&
          appointments.map((appointment, index) => (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
              key={index}
            >
              <div>
                <img
                  className="w-32 bg-indigo-50"
                  src={appointment.image}
                  alt="appointment"
                />
              </div>
              <div className="flex-1 text-sm text-zinc-500">
                <p className="text-neutral-800 font-semibold ">
                  {appointment.name}
                </p>
                <p>{appointment.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{appointment.address.line1}</p>
                <p className="text-xs">{appointment.address.line2}</p>
                <p className="text-xs mt-1">
                  Date and Time:{" "}
                  <span className="text-sm text-neutral-700 font-medium">
                    25, july,2025 | 8:30 PM
                  </span>
                </p>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-end">
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-500">
                  Pay online
                </button>
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-500">
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyAppointments;
