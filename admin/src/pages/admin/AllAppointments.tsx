import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import {
  assets,
  calculateAge,
  slotDateFormat,
  TheAppointment,
} from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const {
    aToken,
    appointments,
    setAppointments,
    getAllApointments,
    cancelAppointment,
  } = useContext(AdminContext);
  const { currencySymbol } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllApointments();
    }
  }, [aToken]);
  console.log(appointments);
  return (
    <div className="w-full mx-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_1fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor Name</p>
          <p>Fee</p>
          <p>Actions</p>
        </div>
        {appointments.map((appointment: TheAppointment, index: number) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_1fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-200"
          >
            <p className="max-sm:hidden ">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={appointment?.userData?.image}
                alt={appointment?.userData?.name}
              />
              <p>{appointment?.userData?.name}</p>
            </div>
            <p className="max-sm:hidden">
              {calculateAge(appointment?.userData?.dob)}
            </p>
            <p>
              {slotDateFormat(appointment.slotDate)},{appointment.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full bg-gray-200"
                src={appointment?.docData?.image}
                alt={appointment?.docData?.name}
              />
              <p>{appointment?.docData?.name}</p>
            </div>
            <p>
              {currencySymbol}.{appointment.amount}
            </p>
            {appointment.canceled ? (
              <p className="text-red-200 text-xm font-medium">Cancelled</p>
            ) : appointment.isCompleted ? (
              <p className="text-xs font-medium text-primary">Completed</p>
            ) : (
              <img
                onClick={() => cancelAppointment(appointment._id)}
                src={assets.cancel_icon}
                alt="cancel icon"
                className="w-10 cursor-pointer"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
