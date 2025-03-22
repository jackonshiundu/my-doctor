import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets, calculateAge, slotDateFormat } from "../../assets/assets";

const DoctorAppointment = () => {
  const { dToken, getAppointments, appointments } = useContext(DoctorContext);
  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);
  console.log(appointments);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="mx-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] grid-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Data & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((appointment, index) => (
          <div
            className="flex fles-wrap justify-center ms-xm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 pt-3 px-6 border-b hover:bg-gray-100"
            key={index}
          >
            <p
              className="max-sm:hidden
            "
            >
              {index + 1}
            </p>
            <div className="flex items-center gap-2">
              <img
                src={appointment?.userData?.image}
                alt={appointment?.userData?.name}
                className="w-8 rounded-full"
              />
              <p>{appointment?.userData?.name}</p>
            </div>
            <div className="text-sm inline border border-primary px-2 rounded-full text-center">
              <p>{appointment?.payment ? "Online" : "CASH"}</p>
            </div>
            <p className="max-sm:hidden">
              {calculateAge(appointment?.userData?.dob)}
            </p>
            <p>
              {slotDateFormat(appointment?.slotDate)} {"  "}
              {appointment?.slotTime}
            </p>
            <p>Ksh.{appointment.amount}</p>
            <div className="flex">
              <img
                className="w-10 cursor-pointer"
                src={assets.cancel_icon}
                alt="cancel-icon"
              />
              <img
                className="w-10 cursor-pointer"
                src={assets.tick_icon}
                alt="tick_icon"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
